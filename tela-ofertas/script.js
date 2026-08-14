const ofertas = [
    {
        titulo: 'Costureira de Amostras',
        empresa: 'Confecção Bella Moda',
        cidade: 'Blumenau - SC',
        publicado: 'Publicado há 5h',
        valor: 'R$ 490,00',
        prazo: 'Prazo: 3 dias',
        tags: ['Malha', 'Mockup', 'Amostras']
    },

    {
        titulo: 'TESTE',
        empresa: 'TESTE',
        cidade: 'TESTE',
        publicado: 'TESTE',
        valor: 'TESTE',
        prazo: 'TESTE',
        tags: ['TESTE', 'TESTE', 'TESTE', 'TESTE', 'TESTE']
    }
]

function CriarElemento(tag, texto) {
    const elemento = document.createElement(tag);
    elemento.textContent = texto;
    return elemento;
}

function CriaArticleJobCard(oferta)
{
    const sectionJobsList = document.querySelector(".jobs-list");    
    const articleJobCard = document.createElement("article");
    articleJobCard.classList.add("job-card");
    
    const divClassJobInfo = document.createElement("div");
    divClassJobInfo.classList.add("job-info");
    articleJobCard.appendChild(divClassJobInfo);

    const divClassTags = document.createElement("div");
    divClassTags.classList.add("tags");

    oferta.tags.forEach(tag => {
        divClassTags.appendChild(CriarElemento("span", tag));
    })

    divClassJobInfo.appendChild(CriarElemento("h2", oferta.titulo));
    divClassJobInfo.appendChild(CriarElemento("h3", oferta.empresa));
    divClassJobInfo.appendChild(CriarElemento("p", oferta.cidade));
    divClassJobInfo.appendChild(CriarElemento("small", oferta.publicado));
    divClassJobInfo.appendChild(divClassTags);

    const divClassJobSide = document.createElement("div");
    divClassJobSide.classList.add("job-side");
    articleJobCard.appendChild(divClassJobSide);

    const ahrefLinkTenhoInteresse = document.createElement("a");
    ahrefLinkTenhoInteresse.classList.add("job-link");
    ahrefLinkTenhoInteresse.textContent = "Tenho interesse";
    ahrefLinkTenhoInteresse.href = "detalhes-vaga.html";

    divClassJobSide.appendChild(CriarElemento("strong", oferta.valor));
    divClassJobSide.appendChild(CriarElemento("small", oferta.prazo));
    divClassJobSide.appendChild(ahrefLinkTenhoInteresse);
    sectionJobsList.appendChild(articleJobCard);
}

for (let i = 0; i < 5; i++) {
    ofertas.forEach(CriaArticleJobCard);
}