// npx json-server --watch db.json --port 3000

const API_URL = "http://localhost:3000/freelancers";
const form = document.querySelector("#form-CadastroFreela");
const inputNome = document.querySelector("#nome");
const inputDataNascimento = document.querySelector("#nascimento");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");
const inputCepResidencial = document.querySelector("#cep-res");
const inputEnderecoResidencial = document.querySelector("#endereco-res");
const inputNumeroResidencial = document.querySelector("#numero-res");
const inputBairroResidencial = document.querySelector("#bairro-res");
const inputCidadeResidencial = document.querySelector("#cidade-res");
const inputEstadoResidencial = document.querySelector("#estado-res");
const inputComplementoResidencial = document.querySelector("#complemento-res");
const inputSenha = document.querySelector("#senha");
const inputConfirmaSenha = document.querySelector("#senha-confirma");
const inputNumeroComercial = document.querySelector("#numero-com");
const inputBairroComercial = document.querySelector("#bairro-com");
const inputComplementoComercial = document.querySelector("#complemento-com");
const inputCepComercial = document.querySelector("#cep-com");
const inputEnderecoComercial = document.querySelector("#endereco-com");
const inputCidadeComercial = document.querySelector("#cidade-com");
const inputEstadoComercial = document.querySelector("#estado-com");
const inputTempoExperiencia = document.querySelector("#experiencia");
const inputTamanhoOficina = document.querySelector("#oficina");
const inputComoFechaServicos = document.querySelector("#fechamento");
const inputDisponibilidadeHorario = document.querySelector("#disponibilidade");
const inputNomeProdutor = document.querySelector("#nome-produtor");
const inputFaturamentoMedio = document.querySelector("#faturamento");
const checkEnderecoComercialIgualResidencial = document.querySelector("#mesmo-endereco");
const inputPesquisaFreela = document.querySelector("#pesquisaFreela");
const buttonPesquisar = document.querySelector("#btn-pesquisar");
let freelaID = "";

// Verifica Validade da Senha
// Possuir mínimo de 10 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial
// Senha e Confirmação devem ser iguais
function senhaEhValida(senha, confirmacaoSenha) {
    const regexMaiusculas = /^[A-Z]+$/;
    const regexMinusculas = /^[a-z]+$/;
    const regexNumeros = /^[0-9]+$/;
    const regexEspecial = /[\W_]/;
    let temUmCaractereMaiusculo = false;
    let temUmCaractereMinusculo = false;
    let temUmCaractereEspecial = false;
    let temUmNumero = false;
    const minimumSenhaLength = 10;

    for (let index = 0; index < senha.length; index++) {
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

// Campo condicional Produtor fixo
const inputProdutorSim = document.querySelector("#produtor-sim");
const inputProdutorNao = document.querySelector("#produtor-nao");

function ExibeOcultaCampoProdutorFixo() {
    if(inputProdutorSim.checked) {
        inputNomeProdutor.removeAttribute("hidden");
    } 
    else {
        inputNomeProdutor.setAttribute("hidden", "");
    } 
}

inputProdutorSim.addEventListener("click", () => {
    ExibeOcultaCampoProdutorFixo();
})

inputProdutorNao.addEventListener("click", () => {
    ExibeOcultaCampoProdutorFixo();
})

// Se Produtor Fixo = Sim então obriga o preenchimento do nome do produtor
function preenchimentoProdutorFixo() {
    if(inputProdutorSim.checked && inputNomeProdutor.value === "") {
        alert("Informe o Nome do Produtor Fixo.");
        return false;
    }
    else { 
        return true; 
    }
}

// Habilitar/Desabilitar campos de endereço comercial
checkEnderecoComercialIgualResidencial.addEventListener("click", () => {
    habilitarDesabilitarCampoEnderecoComercial();
});

function habilitarDesabilitarCampoEnderecoComercial() {
    if(checkEnderecoComercialIgualResidencial.checked) {
        inputCepComercial.disabled = true;
        inputNumeroComercial.disabled = true;
        inputComplementoComercial.disabled = true;
        inputCepComercial.value = "";
        inputEnderecoComercial.value = "";
        inputNumeroComercial.value = "";
        inputBairroComercial.value = "";
        inputComplementoComercial.value = "";
        inputCidadeComercial.value = "";
        inputEstadoComercial.value = "";
    }
    else {
        inputCepComercial.disabled = false;
        inputNumeroComercial.disabled = false;
        inputComplementoComercial.disabled = false;
    }
}

// Pesquisar/Carregar um cadastro
buttonPesquisar.addEventListener("click", function() {
    if(inputPesquisaFreela.value === "") {
        return;
    }
    freelaID = inputPesquisaFreela.value;
    inputPesquisaFreela.value = "";
    carregarCadastro(freelaID);
});

async function carregarCadastro(ID) {
    try{
    const resposta = await fetch(`${API_URL}/${ID}`);

    if(resposta.status===404) {
         alert("Cadastro incorreto ou inexistente.");
         return;
    }

    const freelancer = await resposta.json();

    inputNome.value = freelancer.nome;
    inputDataNascimento.value = freelancer.dataNascimento;
    inputEmail.value = freelancer.email;
    inputTelefone.value = freelancer.telefone;
    inputCepResidencial.value = freelancer.cepResidencial;
    inputEnderecoResidencial.value = freelancer.enderecoResidencial;
    inputNumeroResidencial.value = freelancer.numeroResidencial;
    inputBairroResidencial.value = freelancer.bairroResidencial;
    inputComplementoResidencial.value = freelancer.complementoResidencial;
    inputCidadeResidencial.value = freelancer.cidadeResidencial;
    inputEstadoResidencial.value = freelancer.estadoResidencial;
    inputSenha.value = freelancer.senha;

    if(freelancer.enderecoComercialIgualResidencial) {
        checkEnderecoComercialIgualResidencial.checked = true;
        habilitarDesabilitarCampoEnderecoComercial();        
    }
    else {
        inputCepComercial.value = freelancer.cepComercial;
        inputEnderecoComercial.value = freelancer.enderecoComercial;
        inputNumeroComercial.value = freelancer.numeroComercial;
        inputBairroComercial.value = freelancer.bairroComercial;
        inputComplementoComercial.value = freelancer.complementoComercial;
        inputCidadeComercial.value = freelancer.cidadeComercial;
        inputEstadoComercial.value = freelancer.estadoComercial;
    }

    const radioTipoNegocio = document.querySelector(`input[name="tipo-negocio"][value="${freelancer.tipoNegocio}"]`);
    if (radioTipoNegocio) {
        radioTipoNegocio.checked = true;
    }

    inputTempoExperiencia.value = freelancer.tempoExperiencia;
    inputTamanhoOficina.value = freelancer.tamanhoOficina;

    for (let index = 0; index < freelancer.especialidades.length; index++) {
        const chipEspecialidades = document.querySelector(`input[name="especialidades"][value="${freelancer.especialidades[index]}"]`);
        if (chipEspecialidades) {
            chipEspecialidades.checked = true;
        }       
    }
    
    for (let index = 0; index < freelancer.maquinasQuePossui.length; index++) {
        const chipMaquinas = document.querySelector(`input[name="maquinas"][value="${freelancer.maquinasQuePossui[index]}"]`);
        if (chipMaquinas) {
            chipMaquinas.checked = true;
        }       
    }

    inputComoFechaServicos.value = freelancer.comoFechaServicos;
    inputDisponibilidadeHorario.value = freelancer.disponibilidadeHorario;

    for (let index = 0; index < freelancer.preferenciasDeJobs.length; index++) {
        const chipPreferencias = document.querySelector(`input[name="preferencias"][value="${freelancer.preferenciasDeJobs[index]}"]`);
        if (chipPreferencias) {
            chipPreferencias.checked = true;
        }       
    }    

    if(freelancer.temProdutorFixo){
        const radioProdutorFixo = document.querySelector(`input[name="produtor-fixo"][value="sim"]`);
        radioProdutorFixo.checked = true;
    }
    else {
        const radioProdutorFixo = document.querySelector(`input[name="produtor-fixo"][value="nao"]`);
        if (radioProdutorFixo) {
            radioProdutorFixo.checked = true;
        }       
    }

    inputNomeProdutor.value = freelancer.nomeProdutor;

    if(freelancer.temVeiculo){
        const radioVeiculo = document.querySelector(`input[name="veiculo"][value="sim"]`);
        radioVeiculo.checked = true;
    }
    else {
        const radioVeiculo = document.querySelector(`input[name="veiculo"][value="nao"]`);
        radioVeiculo.checked = true;  
    }

    inputFaturamentoMedio.value = freelancer.faturamentoMedio;

    ExibeOcultaCampoProdutorFixo();

        } catch (erro) {
        console.error(erro);
    }
}

// Criar novo cadastro
form.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    
    if (!form.reportValidity()) {
        console.log(form.reportValidity());
        return;
    }

    if(!senhaEhValida(inputSenha.value, inputConfirmaSenha.value) || 
       !preenchimentoProdutorFixo()) {
        return;
    }

    const containerRadiosTipoNegocios = document.querySelector("#radio-card-tipo-negocio");
    const radiosTipoNegocios = containerRadiosTipoNegocios.querySelectorAll("input");
    let tipoNegocioSelecionado = "";
    for (const tipoNegocio of radiosTipoNegocios) {
        if(tipoNegocio.checked){
            tipoNegocioSelecionado = tipoNegocio.value;
        }
    }

    const containerChipEspecialidades = document.querySelector("#CheckboxEspecialidades");
    const chipEspecialidades = containerChipEspecialidades.querySelectorAll("input");
    let especialidadesSelecionadas = [];
    for (const especialidade of chipEspecialidades) {
        if(especialidade.checked){
            especialidadesSelecionadas.push(especialidade.value);
        }
    }
    
    const containerMaquinas = document.querySelector("#CheckboxMaquinas");
    const chipMaquinas = containerMaquinas.querySelectorAll("input");
    let maquinasSelecionadas = [];
    for (const maquina of chipMaquinas) {
        if(maquina.checked){
            maquinasSelecionadas.push(maquina.value);
        }
    }

    const containerPreferencias = document.querySelector("#CheckboxPreferencias");
    const checkboxPreferencias = containerPreferencias.querySelectorAll("input");
    let preferenciasSelecionadas = [];
    for (const preferencia of checkboxPreferencias) {
        if(preferencia.checked){
            preferenciasSelecionadas.push(preferencia.value);
        }
    }
    
    const inputProdutorSim = document.querySelector("#produtor-sim");
    let isProdutorFixo = "";
    if (inputProdutorSim.checked) {
            isProdutorFixo = true;
    }       
    else {
            isProdutorFixo = false;
    }

    const inputVeiculoSim = document.querySelector("#veiculo-sim");
    let isCarroProprio = "";
    if (inputVeiculoSim.checked) {
            isCarroProprio = true;
        }       
    else {
            isCarroProprio = false;
        }

    let isEnderecoComercialIgualResidencial = "";
    if(checkEnderecoComercialIgualResidencial.checked){
        isEnderecoComercialIgualResidencial = true;
    }
    else {
        isEnderecoComercialIgualResidencial = false;
    }

    const novoFreelancer = {
            id: "",
            nome: inputNome.value,
            dataNascimento: inputDataNascimento.value,
            email: inputEmail.value,
            telefone: inputTelefone.value,
            cepResidencial: inputCepResidencial.value,
            enderecoResidencial: inputEnderecoResidencial.value,
            numeroResidencial: inputNumeroResidencial.value,
            bairroResidencial: inputBairroResidencial.value,
            complementoResidencial: inputComplementoResidencial.value,
            cidadeResidencial: inputCidadeResidencial.value,
            estadoResidencial: inputEstadoResidencial.value,
            senha: inputSenha.value,
            cepComercial: inputCepComercial.value,
            enderecoComercial: inputEnderecoComercial.value,
            numeroComercial: inputNumeroComercial.value,
            bairroComercial: inputBairroComercial.value,
            complementoComercial: inputComplementoComercial.value,
            cidadeComercial: inputCidadeComercial.value,
            estadoComercial: inputEstadoComercial.value,
            tipoNegocio: tipoNegocioSelecionado,
            tempoExperiencia: inputTempoExperiencia.value,
            tamanhoOficina: inputTamanhoOficina.value,
            especialidades: especialidadesSelecionadas,
            maquinasQuePossui: maquinasSelecionadas,
            comoFechaServicos: inputComoFechaServicos.value,
            disponibilidadeHorario: inputDisponibilidadeHorario.value,
            preferenciasDeJobs: preferenciasSelecionadas,
            temProdutorFixo: isProdutorFixo,
            nomeProdutor: inputNomeProdutor.value,
            temVeiculo: isCarroProprio,
            faturamentoMedio: inputFaturamentoMedio.value,
            enderecoComercialIgualResidencial: isEnderecoComercialIgualResidencial
    }

    try { 
        await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(novoFreelancer)
        });

        alert("Cadastro realizado com sucesso! Você será redirecionado para a página inicial.");
    }
    catch (erro) {
        console.error(erro);
    }
})

// Atualizar/Editar um cadastro
const buttonEditar = document.querySelector("#btn-editar");
buttonEditar.addEventListener("click", function() {
    atualizarFreelancer(freelaID);
});

async function atualizarFreelancer(ID){

    if (!form.reportValidity()) {
        console.log(form.reportValidity());
        return;
    }

    if(!senhaEhValida(inputSenha.value, inputConfirmaSenha.value) || 
       !preenchimentoProdutorFixo()) {
        return;
    }

    const containerRadiosTipoNegocios = document.querySelector("#radio-card-tipo-negocio");
    const radiosTipoNegocios = containerRadiosTipoNegocios.querySelectorAll("input");
    let tipoNegocioSelecionado = "";
    for (const tipoNegocio of radiosTipoNegocios) {
        if(tipoNegocio.checked){
            tipoNegocioSelecionado = tipoNegocio.value;
        }
    }

    const containerChipEspecialidades = document.querySelector("#CheckboxEspecialidades");
    const chipEspecialidades = containerChipEspecialidades.querySelectorAll("input");
    let especialidadesSelecionadas = [];
    for (const especialidade of chipEspecialidades) {
        if(especialidade.checked){
            especialidadesSelecionadas.push(especialidade.value);
        }
    }
    
    const containerMaquinas = document.querySelector("#CheckboxMaquinas");
    const chipMaquinas = containerMaquinas.querySelectorAll("input");
    let maquinasSelecionadas = [];
    for (const maquina of chipMaquinas) {
        if(maquina.checked){
            maquinasSelecionadas.push(maquina.value);
        }
    }

    const containerPreferencias = document.querySelector("#CheckboxPreferencias");
    const checkboxPreferencias = containerPreferencias.querySelectorAll("input");
    let preferenciasSelecionadas = [];
    for (const preferencia of checkboxPreferencias) {
        if(preferencia.checked){
            preferenciasSelecionadas.push(preferencia.value);
        }
    }

    const inputProdutorSim = document.querySelector("#produtor-sim");
    let isProdutorFixo = "";
    if (inputProdutorSim.checked) {
            isProdutorFixo = true;
    }       
    else {

            isProdutorFixo = false;
    }

    const inputVeiculoSim = document.querySelector("#veiculo-sim");
    let isCarroProprio = "";
    if (inputVeiculoSim.checked) {
            isCarroProprio = true;
        }       
    else {
            isCarroProprio = false;
        }

    let isEnderecoComercialIgualResidencial = "";
    if(checkEnderecoComercialIgualResidencial.checked){
        isEnderecoComercialIgualResidencial = true;
    }
    else {
        isEnderecoComercialIgualResidencial = false;
    }

    const camposAtualizados = {
            nome: inputNome.value,
            dataNascimento: inputDataNascimento.value,
            email: inputEmail.value,
            telefone: inputTelefone.value,
            cepResidencial: inputCepResidencial.value,
            enderecoResidencial: inputEnderecoResidencial.value,
            numeroResidencial: inputNumeroResidencial.value,
            bairroResidencial: inputBairroResidencial.value,
            complementoResidencial: inputComplementoResidencial.value,            
            cidadeResidencial: inputCidadeResidencial.value,
            estadoResidencial: inputEstadoResidencial.value,
            senha: inputSenha.value,
            cepComercial: inputCepComercial.value,
            enderecoComercial: inputEnderecoComercial.value,
            numeroComercial: inputNumeroComercial.value,
            bairroComercial: inputBairroComercial.value,
            complementoComercial: inputComplementoComercial.value,            
            cidadeComercial: inputCidadeComercial.value,
            estadoComercial: inputEstadoComercial.value,
            tipoNegocio: tipoNegocioSelecionado,
            tempoExperiencia: inputTempoExperiencia.value,
            tamanhoOficina: inputTamanhoOficina.value,
            especialidades: especialidadesSelecionadas,
            maquinasQuePossui: maquinasSelecionadas,
            comoFechaServicos: inputComoFechaServicos.value,
            disponibilidadeHorario: inputDisponibilidadeHorario.value,
            preferenciasDeJobs: preferenciasSelecionadas,
            temProdutorFixo: isProdutorFixo,
            nomeProdutor: inputNomeProdutor.value,
            temVeiculo: isCarroProprio,
            faturamentoMedio: inputFaturamentoMedio.value,
            enderecoComercialIgualResidencial: isEnderecoComercialIgualResidencial
    }

    try {
        await fetch(`${API_URL}/${ID}`, {
            method: "PUT",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(camposAtualizados)
        })

        alert("Alterações no cadastro salvas com sucesso.");
    }
    catch (erro) {
        console.error(erro);
    }
}

// Exibir/Ocultar Senhas
const toggleExibirSenha = document.querySelector("#toggleSenha");
const toggleExibirConfirmaSenha = document.querySelector("#toggleConfirmaSenha");

function exibirOcultarSenha(campoDeInput) {
    (campoDeInput.type === "password") ? campoDeInput.type = "text" : campoDeInput.type = "password";
}

toggleExibirSenha.addEventListener("click", () => {
    exibirOcultarSenha(inputSenha);
});

toggleExibirConfirmaSenha.addEventListener("click", () => {
    exibirOcultarSenha(inputConfirmaSenha);
});

// Busca endereço comercial e residencial via API
async function consultaCEP(campoCEP, campoEndereco, campoNumero, campoBairro, campoCidade, campoEstado, campoComplemento) {
    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${campoCEP.value}/json/`);
        const dados = await resposta.json();

        if(dados.erro) {
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
        else {
            campoEndereco.value = dados.logradouro;
            campoBairro.value = dados.bairro;
            campoCidade.value = dados.localidade;
            campoEstado.value = dados.estado;
            campoNumero.value = "";
            campoComplemento.value = "";
        }
    } catch (erro) {
        console.error(erro);
    }
}

inputCepResidencial.addEventListener("focusout", () => {
    consultaCEP(inputCepResidencial, 
                inputEnderecoResidencial,
                inputNumeroResidencial,
                inputBairroResidencial, 
                inputCidadeResidencial, 
                inputEstadoResidencial, 
                inputComplementoResidencial);
});

inputCepComercial.addEventListener("change", () => {
    consultaCEP(inputCepComercial, 
                inputEnderecoComercial, 
                inputNumeroComercial, 
                inputBairroComercial, 
                inputCidadeComercial, 
                inputEstadoComercial, 
                inputComplementoComercial);
});