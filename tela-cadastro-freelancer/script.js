// npx json-server --watch db.json --port 3000
/* Pendências
1. Campo condicional: produtor fixo 
2. Botão Voltar
3. Validação preenchimento do cadastro
4. Confirmação das operações */

const API_URL = "http://localhost:3000/freelancers";
const form = document.querySelector("#form-CadastroFreela");
const inputNome = document.querySelector("#nome");
const inputDataNascimento = document.querySelector("#nascimento");
const inputEmail = document.querySelector("#email");
const inputTelefone = document.querySelector("#telefone");
const inputCepResidencial = document.querySelector("#cep-res");
const inputEnderecoResidencial = document.querySelector("#endereco-res");
const inputCidadeResidencial = document.querySelector("#cidade-res");
const inputEstadoResidencial = document.querySelector("#estado-res");
const inputSenha = document.querySelector("#senha");
const inputConfirmaSenha = document.querySelector("#senha-confirma");
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
var freelaID = "";

// Check se Senhas correspondem
function verificaSenhasConferem() {
    if(inputSenha.value === inputConfirmaSenha.value) {
        return true;
    }
    else {
        return false;
    }
}

// Habilitar/Desabilitar campos de endereço comercial
checkEnderecoComercialIgualResidencial.addEventListener("click", () => {
    habilitarDesabilitarCampoEnderecoComercial();
});

function habilitarDesabilitarCampoEnderecoComercial() {
    if(checkEnderecoComercialIgualResidencial.checked) {
        inputCepComercial.disabled = true;
        inputEnderecoComercial.disabled = true;
        inputCidadeComercial.disabled = true;
        inputEstadoComercial.disabled = true;
        igualaEnderecoResidencialEComercial();
    }
    else {
        inputCepComercial.disabled = false;
        inputEnderecoComercial.disabled = false;
        inputCidadeComercial.disabled = false;
        inputEstadoComercial.disabled = false;
        igualaEnderecoResidencialEComercial();
    }
}

function igualaEnderecoResidencialEComercial() {
    if(checkEnderecoComercialIgualResidencial.checked) {
        inputCepComercial.value = inputCepResidencial.value;
        inputEnderecoComercial.value = inputEnderecoResidencial.value;
        inputCidadeComercial.value = inputCidadeResidencial.value;
        inputEstadoComercial.value = inputEstadoResidencial.value;
    }
    else {
        inputCepComercial.value = "";
        inputEnderecoComercial.value = "";
        inputCidadeComercial.value = "";
        inputEstadoComercial.value = "";
    }
}

// Pesquisar/Carregar um cadastro
buttonPesquisar.addEventListener("click", function() {
    freelaID = inputPesquisaFreela.value;
    inputPesquisaFreela.value = "";
    carregarCadastro(freelaID);
});

async function carregarCadastro(ID) {
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
    inputCidadeResidencial.value = freelancer.cidadeResidencial;
    inputEstadoResidencial.value = freelancer.estadoResidencial;
    inputSenha.value = freelancer.senha;

    if(freelancer.enderecoComercialIgualResidencial) {
        checkEnderecoComercialIgualResidencial.checked = true;
        inputCepComercial.value = freelancer.cepResidencial;
        inputEnderecoComercial.value = freelancer.enderecoResidencial;
        inputCidadeComercial.value = freelancer.cidadeResidencial;
        inputEstadoComercial.value = freelancer.estadoResidencial;
        habilitarDesabilitarCampoEnderecoComercial();
    }
    else {
        inputCepComercial.value = freelancer.cepComercial;
        inputEnderecoComercial.value = freelancer.enderecoComercial;
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
}

// Criar novo cadastro
form.addEventListener("submit", async function(evento) {
    evento.preventDefault();
    if(!verificaSenhasConferem()) {
        alert("As senhas digitadas são diferentes.")
        return;
    }

    const containerRadiosTipoNegocios = document.querySelector("#radio-card-tipo-negocio");
    const radiosTipoNegocios = containerRadiosTipoNegocios.querySelectorAll("input");
    var tipoNegocioSelecionado = "";
    for (const tipoNegocio of radiosTipoNegocios) {
        if(tipoNegocio.checked){
            tipoNegocioSelecionado = tipoNegocio.value;
        }
    }

    const containerChipEspecialidades = document.querySelector("#CheckboxEspecialidades");
    const chipEspecialidades = containerChipEspecialidades.querySelectorAll("input");
    var especialidadesSelecionadas = [];
    for (const especialidade of chipEspecialidades) {
        if(especialidade.checked){
            especialidadesSelecionadas.push(especialidade.value);
        }
    }
    
    const containerMaquinas = document.querySelector("#CheckboxMaquinas");
    const chipMaquinas = containerMaquinas.querySelectorAll("input");
    var maquinasSelecionadas = [];
    for (const maquina of chipMaquinas) {
        if(maquina.checked){
            maquinasSelecionadas.push(maquina.value);
        }
    }

    const containerPreferencias = document.querySelector("#CheckboxPreferencias");
    const checkboxPreferencias = containerPreferencias.querySelectorAll("input");
    var preferenciasSelecionadas = [];
    for (const preferencia of checkboxPreferencias) {
        if(preferencia.checked){
            preferenciasSelecionadas.push(preferencia.value);
        }
    }
    
    const inputProdutorSim = document.querySelector("#produtor-sim");
    var isProdutorFixo = "";
    if (inputProdutorSim.checked) {
            isProdutorFixo = true;
    }       
    else {
            isProdutorFixo = false;
    }

    const inputVeiculoSim = document.querySelector("#veiculo-sim");
    var isCarroProprio = "";
    if (inputVeiculoSim.checked) {
            isCarroProprio = true;
        }       
    else {
            isCarroProprio = false;
        }

    var isEnderecoComercialIgualResidencial = "";
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
            cidadeResidencial: inputCidadeResidencial.value,
            estadoResidencial: inputEstadoResidencial.value,
            senha: inputSenha.value,
            cepComercial: inputCepComercial.value,
            enderecoComercial: inputEnderecoComercial.value,
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

    await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(novoFreelancer)
    });
})

// Atualizar/Editar um cadastro
const buttonEditar = document.querySelector("#btn-editar");
buttonEditar.addEventListener("click", function() {
    atualizarFreelancer(freelaID);
});

async function atualizarFreelancer(ID){
    const containerRadiosTipoNegocios = document.querySelector("#radio-card-tipo-negocio");
    const radiosTipoNegocios = containerRadiosTipoNegocios.querySelectorAll("input");
    var tipoNegocioSelecionado = "";
    for (const tipoNegocio of radiosTipoNegocios) {
        if(tipoNegocio.checked){
            tipoNegocioSelecionado = tipoNegocio.value;
        }
    }

    const containerChipEspecialidades = document.querySelector("#CheckboxEspecialidades");
    const chipEspecialidades = containerChipEspecialidades.querySelectorAll("input");
    var especialidadesSelecionadas = [];
    for (const especialidade of chipEspecialidades) {
        if(especialidade.checked){
            especialidadesSelecionadas.push(especialidade.value);
        }
    }
    
    const containerMaquinas = document.querySelector("#CheckboxMaquinas");
    const chipMaquinas = containerMaquinas.querySelectorAll("input");
    var maquinasSelecionadas = [];
    for (const maquina of chipMaquinas) {
        if(maquina.checked){
            maquinasSelecionadas.push(maquina.value);
        }
    }

    const containerPreferencias = document.querySelector("#CheckboxPreferencias");
    const checkboxPreferencias = containerPreferencias.querySelectorAll("input");
    var preferenciasSelecionadas = [];
    for (const preferencia of checkboxPreferencias) {
        if(preferencia.checked){
            preferenciasSelecionadas.push(preferencia.value);
        }
    }

    const inputProdutorSim = document.querySelector("#produtor-sim");
    var isProdutorFixo = "";
    if (inputProdutorSim.checked) {
            isProdutorFixo = true;
    }       
    else {

            isProdutorFixo = false;
    }

    const inputVeiculoSim = document.querySelector("#veiculo-sim");
    var isCarroProprio = "";
    if (inputVeiculoSim.checked) {
            isCarroProprio = true;
        }       
    else {
            isCarroProprio = false;
        }

    var isEnderecoComercialIgualResidencial = "";
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
            cidadeResidencial: inputCidadeResidencial.value,
            estadoResidencial: inputEstadoResidencial.value,
            senha: inputSenha.value,
            cepComercial: inputCepComercial.value,
            enderecoComercial: inputEnderecoComercial.value,
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

    await fetch(`${API_URL}/${ID}`, {
        method: "PUT",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify(camposAtualizados)
    })
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