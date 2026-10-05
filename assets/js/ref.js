/* Suivi des affiliés et parrains
 * Un lien du type https://hello.giveme5xxxxx.fr/?ref=marie retient « marie » pendant 60 jours,
 * puis l'ajoute à chaque lien de paiement Stripe (client_reference_id).
 * La vente apparaît ensuite dans Stripe avec cet identifiant.
 * Dernier clic gagnant : un nouveau ?ref= remplace le précédent.
 */
(function () {
  var KEY = 'gm5_ref';
  var DAYS = 60;
  // Format accepté par Stripe : lettres, chiffres, tirets, traits de soulignement (200 max)
  var VALID = /^[A-Za-z0-9_-]{1,60}$/;

  function readStored() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || !VALID.test(data.ref) || Date.now() > data.exp) {
        localStorage.removeItem(KEY);
        return null;
      }
      return data.ref;
    } catch (e) {
      return null;
    }
  }

  function store(ref) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ref: ref, exp: Date.now() + DAYS * 864e5 }));
    } catch (e) { /* navigation privée : le ref reste valable pour cette visite */ }
  }

  var fromUrl = null;
  try {
    fromUrl = new URLSearchParams(location.search).get('ref');
  } catch (e) { /* navigateur ancien */ }

  var ref = null;
  if (fromUrl && VALID.test(fromUrl)) {
    ref = fromUrl;
    store(ref);
  } else {
    ref = readStored();
  }
  if (!ref) return;

  function tag() {
    var links = document.querySelectorAll('a[href^="https://buy.stripe.com/"]');
    for (var i = 0; i < links.length; i++) {
      try {
        var u = new URL(links[i].href);
        u.searchParams.set('client_reference_id', ref);
        links[i].href = u.toString();
      } catch (e) { /* lien laissé tel quel */ }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tag);
  } else {
    tag();
  }
})();
