// npx json-server --watch db.json --port 3000

const API_URL = "http://localhost:3000/empresas";
const form = document.querySelector("form");
const inputNomeResponsavel = document.querySelector("#resp-nome");
const inputCPFResponsavel = document.querySelector("#resp-cpf");
const inputRazaoSocial = document.querySelector("#razao");
const inputNomeFantasia = document.querySelector("#fantasia");
const inputCNPJ = document.querySelector("#cnpj");
const inputRamoAtuacao = document.querySelector("#ramo");
const inputEmail = document.querySelector("#email-empresa");
const inputTelefone = document.querySelector("#telefone-empresa");
const inputDescricao = document.querySelector("#descricao-empresa");
const inputCepComercial = document.querySelector("#cep-empresa");
const inputEnderecoComercial = document.querySelector("#endereco-empresa");
const inputNumeroComercial = document.querySelector("#numero-empresa");
const inputBairroComercial = document.querySelector("#bairro-empresa");
const inputCidadeComercial = document.querySelector("#cidade-empresa");
const inputEstadoComercial = document.querySelector("#estado-empresa");
const inputComplementoComercial = document.querySelector("#complemento-empresa");
const inputSenha = document.querySelector("#senha");
const inputConfirmaSenha = document.querySelector("#senha-confirmacao");
const alertBar = document.querySelector(".alert.alert-success");

// Toggle Tema Dark/Light
const themeButton = document.querySelector(".theme-toggle");

themeButton.addEventListener("click", () => 
{
    document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === "light"
        ? "dark"
        : "light";
});

// Busca endereço via API
async function consultaCEP(campoCEP, campoEndereco, campoNumero, campoBairro, campoCidade, campoEstado, campoComplemento) {
    try {
        const cep = campoCEP.value.replace(/\D/g, "");
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`, 
        {
            method: "GET"
        });
        
        const dados = await resposta.json();

        if(dados.erro) 
        {
            campoEndereco.value = "";
            campoCidade.value = "";
            campoEstado.value = "";
            campoComplemento.value = "";
            campoNumero.value = "";
            campoComplemento.value = "";
            campoBairro.value = "";
            campoCEP.value = "";
            alert("Verifique o CEP informado, endereço incorreto ou não localizado.");
            return;
        }
        else 
        {
            campoEndereco.value = dados.logradouro;
            campoBairro.value = dados.bairro;
            campoCidade.value = dados.localidade;
            campoEstado.value = dados.estado;
            campoNumero.value = "";
            campoComplemento.value = "";
        }
    } 
    catch (erro) 
    {
        console.error(erro);
    }
}

inputCepComercial.addEventListener("change", () => 
{
    consultaCEP(inputCepComercial, 
                inputEnderecoComercial, 
                inputNumeroComercial, 
                inputBairroComercial, 
                inputCidadeComercial, 
                inputEstadoComercial, 
                inputComplementoComercial);
});

// Máscara de Telefone 
function mascaraTelefone(campo) 
{
    const numeros = campo.value.replace(/\D/g, "").slice(0, 11);

    if(numeros.length <= 10) 
    {
        campo.value = numeros.replace(/(\d{2})(\d{0,4})(\d{0,4})/, (_, ddd, inicio, fim) => 
        {
            if(!inicio) return `(${ddd}`;
            if(!fim) return `(${ddd}) ${inicio}`;
            return `(${ddd}) ${inicio}-${fim}`;
        });
        return;
    }

    campo.value = numeros.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
}

inputTelefone.addEventListener("input", () => mascaraTelefone(inputTelefone));

// Máscara de CEP
function mascaraCEP(campo) 
{
    const numeros = campo.value.replace(/\D/g, "").slice(0, 8);
    campo.value = numeros.length > 5
        ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
        : numeros;
}

inputCepComercial.addEventListener("input", () => mascaraCEP(inputCepComercial));

// Máscara de CNPJ
function mascaraCNPJ(campo)
{
    const caracteres = campo.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 14);

    campo.value = caracteres.replace(
        /([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{0,2})/,
        (_, parte1, parte2, parte3, parte4, parte5) =>
        {
            if(!parte2) return parte1;
            if(!parte3) return `${parte1}.${parte2}`;
            if(!parte4) return `${parte1}.${parte2}.${parte3}`;
            if(!parte5) return `${parte1}.${parte2}.${parte3}/${parte4}`;

            return `${parte1}.${parte2}.${parte3}/${parte4}-${parte5}`;
        }
    );
}

inputCNPJ.addEventListener("input", () => mascaraCNPJ(inputCNPJ));

// Máscara de CPF
function mascaraCPF(campo)
{
    const numeros = campo.value
        .replace(/\D/g, "")
        .slice(0, 11);

    campo.value = numeros.replace(
        /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
        (_, parte1, parte2, parte3, parte4) =>
        {
            if(!parte2) return parte1;
            if(!parte3) return `${parte1}.${parte2}`;
            if(!parte4) return `${parte1}.${parte2}.${parte3}`;

            return `${parte1}.${parte2}.${parte3}-${parte4}`;
        }
    );
}

inputCPFResponsavel.addEventListener("input", () => mascaraCPF(inputCPFResponsavel));

// Toggle exibe / oculta senha
exibeSenha.addEventListener("click", () => 
{
    inputSenha.type === "password" ? inputSenha.type = "text" : inputSenha.type = "password";
})

exibeConfirmaSenha.addEventListener("click", () => 
{
    inputConfirmaSenha.type === "password" ? inputConfirmaSenha.type = "text" : inputConfirmaSenha.type = "password";
})

// Verifica Validade da Senha
// Possuir mínimo de 10 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial
// Senha e Confirmação devem ser iguais
function senhaEhValida(senha, confirmacaoSenha) 
{
    const regexMaiusculas = /^[A-Z]+$/;
    const regexMinusculas = /^[a-z]+$/;
    const regexNumeros = /^[0-9]+$/;
    const regexEspecial = /[\W_]/;
    let temUmCaractereMaiusculo = false;
    let temUmCaractereMinusculo = false;
    let temUmCaractereEspecial = false;
    let temUmNumero = false;
    const minimumSenhaLength = 10;

    for (let index = 0; index < senha.length; index++) 
    {
        if(regexMaiusculas.test(senha[index])) {temUmCaractereMaiusculo = true;}     
        if(regexMinusculas.test(senha[index])) {temUmCaractereMinusculo = true;}
        if(regexNumeros.test(senha[index])) {temUmNumero = true;}
        if(regexEspecial.test(senha[index])) {temUmCaractereEspecial = true;}
    };
    
    if(!temUmCaractereMaiusculo || !temUmCaractereMinusculo ||
       !temUmNumero || !temUmCaractereEspecial || senha.length < minimumSenhaLength) 
    {
        alert("A senha deve ter no mínimo 10 caracteres e incluir obrigatoriamente uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        return false;
    }

    if(senha != confirmacaoSenha) {
        alert("As senhas digitadas não correspondem.");
        return false;
    }

    return true;
}

function limparFormulario() 
{
    inputNomeResponsavel.value = "",
    inputCPFResponsavel.value = "",
    inputRazaoSocial.value = "",
    inputNomeFantasia.value = "",
    inputCNPJ.value = "",
    inputRamoAtuacao.value = "",
    inputEmail.value = "",
    inputTelefone.value = "",
    inputDescricao.value = "",
    inputCepComercial.value = "",
    inputEnderecoComercial.value = "",
    inputNumeroComercial.value = "",
    inputEstadoComercial.value = "",
    inputCidadeComercial.value = "",
    inputEstadoComercial.value = "",
    inputComplementoComercial.value = "",
    inputSenha.value = "",
    inputConfirmaSenha.value = ""
}

// Cadastrar nova Empresa
function sleep(ms) 
{
  return new Promise(resolve => setTimeout(resolve, ms))
}

form.addEventListener("submit", async (evento) => 
{
    evento.preventDefault();

    if (!form.checkValidity()) 
    {
        form.reportValidity();
        return;
    }

    if(!senhaEhValida(inputSenha.value, inputConfirmaSenha.value)) 
    {
        return;
    }

    const novaEmpresa = 
    {
            id: "",
            nomeResponsavel: inputNomeResponsavel.value,
            cpfResponsavel: inputCPFResponsavel.value,
            razaoSocial: inputRazaoSocial.value,
            nomeFantasia: inputNomeFantasia.value,
            cnpjEmpresa: inputCNPJ.value,
            ramoAtuacao: inputRamoAtuacao.value,
            email: inputEmail.value,
            telefone: inputTelefone.value,
            descricaoPerfil: inputDescricao.value,
            cep: inputCepComercial.value,
            enderecoComercial: inputEnderecoComercial.value,
            numeroComercial: inputNumeroComercial.value,
            bairroComercial: inputBairroComercial.value,
            cidadeComercial: inputCidadeComercial.value,
            estadoComercial: inputEstadoComercial.value,
            complementoComercial: inputComplementoComercial.value,
            senha: inputSenha.value,
            mediaAvaliacoes: 0,
            totalAvaliacoes: 0
    }

try 
{
    const resposta = await fetch(API_URL, 
    {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novaEmpresa)
    });

    if (!resposta.ok) 
    {
        throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    limparFormulario();
    alertBar.removeAttribute("hidden");
    window.scrollTo({top: 0, behavior: "smooth"});
    await sleep(5000);
    window.location.href = "01-homepage.html";
    
} 
catch (erro) 
{
    console.error(erro);
}
});