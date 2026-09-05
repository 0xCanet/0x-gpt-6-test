import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/geist-mono';
import './style.css';

const articles = {
  garden: {
    title: 'La bibliothèque prend l’air : un jardin pour lire autrement',
    body: 'Une bibliothèque de quartier ouvre un espace de lecture dans son jardin. Des assises et une sélection de livres y accueillent les lecteurs. L’équipe souhaite proposer un autre cadre de lecture et faire découvrir le lieu aux habitants.',
    facebook: 'Et si votre prochaine pause lecture se passait au jardin ? Une bibliothèque de quartier installe des assises et une sélection de livres en plein air. Une autre façon de découvrir ce lieu, à retrouver dans notre article.',
    instagram: 'Un livre, une assise, un jardin. La bibliothèque de quartier invite les habitants à lire en plein air et à découvrir le lieu autrement.\n\n#Lecture #Bibliothèque #VieLocale',
    linkedin: 'Faire découvrir une bibliothèque en changeant le cadre de lecture : c’est le choix d’une équipe qui ouvre son jardin aux habitants. Des assises et une sélection de livres prolongent l’accueil hors les murs. Notre article présente cette initiative de proximité.',
    x: 'La bibliothèque prend l’air : un espace de lecture ouvre dans son jardin, avec des assises et une sélection de livres. Une invitation à découvrir le lieu autrement. À lire dans notre article.'
  },
  night: {
    title: 'À vélo après la nuit : un atelier pour être mieux visible',
    body: 'Une association de quartier organise un atelier consacré à la visibilité à vélo. Les participants vérifient leur éclairage et découvrent des équipements réfléchissants. Les bénévoles rappellent les précautions à prendre pour les trajets nocturnes.',
    facebook: 'Vos lumières de vélo sont-elles prêtes pour la nuit ? Une association de quartier propose un atelier pour vérifier son éclairage et découvrir des équipements réfléchissants. Nous vous présentons cette initiative dans notre article.',
    instagram: 'Quand la nuit tombe, la visibilité compte. Éclairage, équipements réfléchissants, précautions : un atelier de quartier aide les cyclistes à préparer leurs trajets nocturnes.\n\n#Vélo #Mobilités #VieLocale',
    linkedin: 'Accompagner les mobilités du quotidien passe aussi par la visibilité. Une association de quartier réunit des cyclistes autour de la vérification de leur éclairage et de la découverte d’équipements réfléchissants. Un exemple d’action de proximité à découvrir dans notre article.',
    x: 'À vélo après la nuit : une association propose un atelier pour vérifier son éclairage et découvrir des équipements réfléchissants. Notre article revient sur cette initiative de quartier.'
  }
};
const angles = {
  facebook: 'Facebook · Une accroche de proximité pour ouvrir la lecture.',
  instagram: 'Instagram · Une légende visuelle et des mots-clés liés au sujet.',
  linkedin: 'LinkedIn · Le sujet replacé dans son contexte professionnel.',
  x: 'X · L’essentiel du sujet dans une formulation courte.'
};
const $ = (id) => document.getElementById(id);
let article = 'garden';
let network = 'facebook';
const edits = {};
const approvals = new Set();
const images = { garden: true, night: true };
const key = () => `${article}:${network}`;
const blocked = () => network === 'instagram' && !images[article];
function status(message) { $('feedback').textContent = message; }
function updateState() {
  const empty = !$('proposal-text').value.trim();
  $('char-count').textContent = `${$('proposal-text').value.length} car.`;
  $('approve').disabled = blocked() || empty;
  $('availability').classList.toggle('warning', blocked() || empty);
  $('availability').textContent = blocked()
    ? 'Diffusion bloquée dans cet exemple : Instagram requiert une image exploitable. Cochez « Image principale exploitable » pour poursuivre.'
    : empty ? 'Proposition vide : saisissez un texte pour simuler sa validation.'
    : approvals.has(key()) ? 'Proposition validée dans la démo — aucune publication effectuée.'
    : 'À relire — vous pouvez modifier ce texte avant de simuler sa validation.';
}
function render() {
  $('article-title').textContent = articles[article].title;
  $('article-body').textContent = articles[article].body;
  $('image-available').checked = images[article];
  $('angle').textContent = angles[network];
  $('proposal-text').value = edits[key()] ?? articles[article][network];
  document.querySelectorAll('[role=tab]').forEach(tab => {
    const active = tab.dataset.network === network;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('proposal').setAttribute('aria-labelledby', `tab-${network}`);
  updateState();
  status(approvals.has(key()) ? 'Validation locale conservée pour ce texte. Rien n’a été envoyé.' : 'La validation sera simulée. Rien ne sera envoyé.');
}
$('article-select').addEventListener('change', e => {article = e.target.value; render();});
const tabs = [...document.querySelectorAll('[role=tab]')];
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {network = tab.dataset.network; render();});
  tab.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { e.preventDefault(); tabs[next].click(); tabs[next].focus(); }
  });
});
$('proposal-text').addEventListener('input', () => {
  edits[key()] = $('proposal-text').value;
  approvals.delete(key());
  updateState();
  status('Texte modifié dans cette page uniquement. Vous pouvez le valider dans la démo.');
});
$('image-available').addEventListener('change', e => {
  images[article] = e.target.checked;
  approvals.delete(`${article}:instagram`);
  updateState();
  status(blocked() ? 'Instagram est bloqué : ajoutez une image exploitable pour poursuivre la simulation.' : 'État de l’image mis à jour dans la démo uniquement.');
});
$('approve').addEventListener('click', () => {
  if (blocked() || !$('proposal-text').value.trim()) return;
  approvals.add(key()); updateState();
  status(`Proposition ${network === 'x' ? 'X' : network === 'linkedin' ? 'LinkedIn' : network === 'instagram' ? 'Instagram' : 'Facebook'} validée dans la démo. Aucune publication réelle. Vous pouvez comparer un autre réseau.`);
});
$('restore').addEventListener('click', () => {
  delete edits[key()]; approvals.delete(key()); render();
  status('Texte de démonstration rétabli pour ce réseau. Rien n’a été envoyé.');
});
render();
