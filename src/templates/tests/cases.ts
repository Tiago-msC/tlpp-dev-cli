export function getCasesTemplate(nameClass: string) {
	return `#INCLUDE "PROTHEUS.CH"

//-------------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestCase

@author COLOQUE O AUTOR
@since COLOQUE A DATA
@version 1.0
@see FWDefaultTestSuit , FWDefaultTestCase
/*/
//-------------------------------------------------------------------
Class ${nameClass}TestCase FROM FWDefaultTestCase
	DATA oHelper

	METHOD  SetUpClass()
	METHOD  ${nameClass}TestCase() Constructor

	METHOD  teste_001()
	// METHOD  teste_002()
	// METHOD  teste_003()
	// METHOD  teste_004()
EndClass

//-----------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestCase
	Instancia os casos de teste

@author COLOQUE O AUTOR
@since COLOQUE A DATA
@version 1.0
/*/
//-----------------------------------------------------------------
METHOD ${nameClass}TestCase() Class ${nameClass}TestCase
	_Super:FWDefaultTestSuite()

	//If GetRpoRelease() > "12.1.027"
	Self:AddTestMethod("teste_001",,"POST - Gravar agrupador de ativos sem enviar codassets")
	// Self:AddTestMethod("teste_002",,"POST - Teste negativo - JSON com propriedades insuficientes")
	// Self:AddTestMethod("teste_003",,"POST - Teste negativo - JSON com propriedades vazias")
	// Self:AddTestMethod("teste_004",,"POST - Gravar alteracao ${String(nameClass).toLocaleLowerCase()}")
	//EndIf
Return

//-----------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestCase
	Instancia os casos de teste

@author COLOQUE O AUTOR
@since COLOQUE A DATA
@version 1.0
/*/
//-----------------------------------------------------------------
METHOD SetUpClass() CLASS ${nameClass}TestCase
	Local oHelper := FWTestHelper():New()
Return oHelper

//-------------------------------------------------------------------
/*/{Protheus.doc} teste_001
Teste automatizado - Todas as configuracoes de agrupador patrimonial disponiveis
@author COLOQUE O AUTOR
@since COLOQUE A DATA
@version 1.0
/*/
//-------------------------------------------------------------------
METHOD teste_001() CLASS ${nameClass}TestCase
	Local aHeader   := {}
	Local cBody     := ""
	Local cRet      := ""
	Local cJsonRet  := ""
	Local cURL      := "/api/rt/saveassetgroup/"
	Local oHelper   := FWTestHelper():New()
	Local oResponse := JsonObject():new()

	cBody := '{"teste": "Teste"}'


		/* O EncodeUTF8 convertera a string para UTF8, mesmo tipo de encode enviado 
		pelo front end para a API SaveAssetGroup*/
		
		cBody := EncodeUtf8(cBody, "cp1252") 

		oHelper:Activate()

		aHeader := {"Content-Type: application/json", "Authorization: Basic " + oHelper:UtSetAuthorization('admin','1234') + ""}

		If !oHelper:UTSetAPI(cURL, "REST")
				oHelper:UTPutError("Falha ao executar metodo GET - Ocorreu um erro ao conectar-se ao servidor")
		Else        
				cJsonRet := oHelper:UTPostWS(cBody,aHeader)  
				cRet     := oResponse:FromJson(cJsonRet)
				
				If cJsonRet == "{}"
						oHelper:UTPutError("Falha ao gravar ${String(nameClass).toLocaleLowerCase()}")
				EndIf

		EndIf
		
		oHelper:AssertTrue(oHelper:lOk, "")

Return oHelper

// SE NECESSARIO, DESCOMENTE OS METODOS ABAIXO E IMPLEMENTE OS TESTES!!!
//-------------------------------------------------------------------
/*/{Protheus.doc} teste_001
Teste automatizado - Todas as configuracoes de conciliacao disponiveis
@author COLOQUE O AUTOR
@since COLOQUE A DATA
@version 1.0
/*/
//-------------------------------------------------------------------
// METHOD teste_002() CLASS ${nameClass}TestCase
//     Local aHeader   := {}
//     Local cBody     := ""
//     Local cRet      := ""
//     Local cJsonRet  := ""
//     Local cURL      := "/api/tc/savematchsetting/"
//     Local oHelper   := FWTestHelper():New()
//     Local oResponse := JsonObject():new()

//     cBody := '{"tabori":"SE1","descor":"Contas a Receber","tabdes":"CT2","descde":"Lan�amentos Cont�beis",'+;
//              '"fields":{"data_ori":["E1_FILIAL","E1_PREFIXO","E1_NUM","E1_PARCELA","E1_TIPO","E1_NATUREZ","E1_CLIENTE","E1_LOJA","E1_EMISSAO","E1_VENCTO",'+;
//              '                      "E1_VENCREA","E1_VALOR","E1_MOEDA"],'+;
//              '          "data_des":["CT2_FILIAL","CT2_DATA","CT2_LOTE","CT2_SBLOTE","CT2_DOC","CT2_MOEDLC","CT2_DC","CT2_DEBITO","CT2_CREDIT","CT2_VALOR",'+;
//              '          "CT2_HIST","CT2_CCD","CT2_CCC","CT2_ITEMD","CT2_ITEMC","CT2_CLVLDB","CT2_CLVLCR","CT2_ORIGEM"]},'+;
//              '"filter":{"tabori":[{"order":"01","field":"E1_EMISSAO","operation":">="},{"order":"02","field":"E1_EMISSAO","operation":"<="},'+;
//              '                      {"order":"03","field":"E1_PREFIXO","operation":">="},{"order":"04","field":"E1_PREFIXO","operation":"<="},'+;
//              '                      {"order":"05","field":"E1_TIPO","operation":"IN"}],'+;
//              '          "tabdes":[{"order":"01","field":"CT2_DATA","operation":">="},{"order":"02","field":"CT2_DATA","operation":"<="},'+;
//              '                      {"order":"03","field":"CT2_DOC","operation":">="},{"order":"04","field":"CT2_DOC","operation":"<="},'+;
//              '                      {"order":"05","field":"CT2_DEBITO","operation":">="},{"order":"06","field":"CT2_DEBITO","operation":"<="},'+;
//              '                      {"order":"07","field":"CT2_CREDIT","operation":">="},{"order":"08","field":"CT2_CREDIT","operation":"<="}]},'+;
//              '"cidori":"E1_MSUIDT","ciddes":"CT2_MSUIDT",'+;
//              '"regmat":{"rules":[{"idrule":"001","name":"regra_001","linktable":"CV3",'+;
//              '          "rule":{"ori_fields":"E1_MSUIDT","ori_link":"E1_MSUIDT = RTRIM(CV3_IDORIG)",'+;
//              '                      "des_fields":"CT2_MSUIDT","des_link":"CT2_MSUIDT = RTRIM(CV3_IDDEST)","condition":"CV3_IDORIG <> '+ "' '" +' AND CV3_IDDEST <> '+ "' '" +' AND E1_MSUIDT = CV3_IDORIG AND CT2_MSUIDT = CV3_IDDEST"}}]},'+;
//              '"total":{"totalori":[{"label":"Total","total":"E1_VALOR"}],"totaldes":[{"label":"Total a D�bito","condition":"CT2_DC = ' + "'1'" + ' OR CT2_DC = ' + "'3'" + '","total":"CT2_VALOR"},{"label":"Total a Cr�dito","condition":"CT2_DC = ' + "'2'" + ' OR CT2_DC = '+ "'3'" + '","total":"CT2_VALOR"}]}}'
		
//     /* O EncodeUTF8 convertera a string para UTF8, mesmo tipo de encode enviado 
//     pelo front end para a API SaveAssetGroup*/
		
//     cBody := EncodeUtf8(cBody, "cp1252") 

//     oHelper:Activate()

//     aHeader := {"Content-Type: application/json", "Authorization: Basic " + oHelper:UtSetAuthorization('admin','1234') + ""}

//     If !oHelper:UTSetAPI(cURL, "REST")
//         oHelper:UTPutError("Falha ao executar metodo GET - Ocorreu um erro ao conectar-se ao servidor")
//     Else        
//         cJsonRet := oHelper:UTPostWS(cBody,aHeader)  
//         cRet     := oResponse:FromJson(cJsonRet)

//         If cJsonRet == "{}"
//             oHelper:UTPutError("matchsetting n�o deveria gravar, visto que o JSON enviado n�o possui a propriedade 'descfg'")
//         EndIf

//     EndIf
		
//     oHelper:AssertFalse(oHelper:lOk, "")
// Return oHelper

// //-------------------------------------------------------------------
// /*/{Protheus.doc} teste_003
// Teste automatizado - JSON com propriedades vazias"
// @author COLOQUE O AUTOR
// @since 31/05/2022
// @version 1.0
// /*/
// //-------------------------------------------------------------------
// METHOD teste_003() CLASS ${nameClass}TestCase
//     Local aHeader   := {}
//     Local cBody     := ""
//     Local cRet      := ""
//     Local cJsonRet  := ""
//     Local cURL      := "/api/tc/savematchsetting/"
//     Local oHelper   := FWTestHelper():New()
//     Local oResponse := JsonObject():new()

//     cBody := '{"descfg":"","tabori":"","descor":"","tabdes":"","descde":"",'+;
//              '"fields":{"data_ori":["E1_FILIAL","E1_PREFIXO","E1_NUM","E1_PARCELA","E1_TIPO","E1_NATUREZ","E1_CLIENTE","E1_LOJA","E1_EMISSAO","E1_VENCTO",'+;
//              '                      "E1_VENCREA","E1_VALOR","E1_MOEDA"],'+;
//              '          "data_des":["CT2_FILIAL","CT2_DATA","CT2_LOTE","CT2_SBLOTE","CT2_DOC","CT2_MOEDLC","CT2_DC","CT2_DEBITO","CT2_CREDIT","CT2_VALOR",'+;
//              '          "CT2_HIST","CT2_CCD","CT2_CCC","CT2_ITEMD","CT2_ITEMC","CT2_CLVLDB","CT2_CLVLCR","CT2_ORIGEM"]},'+;
//              '"filter":{"tabori":[{"order":"01","field":"E1_EMISSAO","operation":">="},{"order":"02","field":"E1_EMISSAO","operation":"<="},'+;
//              '                      {"order":"03","field":"E1_PREFIXO","operation":">="},{"order":"04","field":"E1_PREFIXO","operation":"<="},'+;
//              '                      {"order":"05","field":"E1_TIPO","operation":"IN"}],'+;
//              '          "tabdes":[{"order":"01","field":"CT2_DATA","operation":">="},{"order":"02","field":"CT2_DATA","operation":"<="},'+;
//              '                      {"order":"03","field":"CT2_DOC","operation":">="},{"order":"04","field":"CT2_DOC","operation":"<="},'+;
//              '                      {"order":"05","field":"CT2_DEBITO","operation":">="},{"order":"06","field":"CT2_DEBITO","operation":"<="},'+;
//              '                      {"order":"07","field":"CT2_CREDIT","operation":">="},{"order":"08","field":"CT2_CREDIT","operation":"<="}]},'+;
//              '"cidori":"E1_MSUIDT","ciddes":"CT2_MSUIDT",'+;
//              '"regmat":{"rules":[{"idrule":"001","name":"regra_001","linktable":"CV3",'+;
//              '          "rule":{"ori_fields":"E1_MSUIDT","ori_link":"E1_MSUIDT = RTRIM(CV3_IDORIG)",'+;
//              '                      "des_fields":"CT2_MSUIDT","des_link":"CT2_MSUIDT = RTRIM(CV3_IDDEST)","condition":"CV3_IDORIG <> '+ "' '" +' AND CV3_IDDEST <> '+ "' '" +' AND E1_MSUIDT = CV3_IDORIG AND CT2_MSUIDT = CV3_IDDEST"}}]},'+;
//              '"total":{"totalori":[{"label":"Total","total":"E1_VALOR"}],"totaldes":[{"label":"Total a D�bito","condition":"CT2_DC = ' + "'1'" + ' OR CT2_DC = ' + "'3'" + '","total":"CT2_VALOR"},{"label":"Total a Cr�dito","condition":"CT2_DC = ' + "'2'" + ' OR CT2_DC = '+ "'3'" + '","total":"CT2_VALOR"}]}}'
		
//     /* O EncodeUTF8 convertera a string para UTF8, mesmo tipo de encode enviado 
//     pelo front end para a API SaveAssetGroup*/
		
//     cBody := EncodeUtf8(cBody, "cp1252") 

//     oHelper:Activate()

//     aHeader := {"Content-Type: application/json", "Authorization: Basic " + oHelper:UtSetAuthorization('admin','1234') + ""}

//     If !oHelper:UTSetAPI(cURL, "REST")
//         oHelper:UTPutError("Falha ao executar metodo GET - Ocorreu um erro ao conectar-se ao servidor")
//     Else        
//         cJsonRet := oHelper:UTPostWS(cBody,aHeader)  
//         cRet     := oResponse:FromJson(cJsonRet)
				
//         If cJsonRet <> "{}"
//             oHelper:UTPutError("Falha ao gravar matchsetting")
//         EndIf

//     EndIf
		
//     oHelper:AssertFalse(oHelper:lOk, "")

// Return oHelper

// //-------------------------------------------------------------------
// /*/{Protheus.doc} teste_004
// Teste automatizado - Gravar alteracao agrupador de ativos
// @author COLOQUE O AUTOR
// @since 31/05/2022
// @version 1.0
// /*/
// //-------------------------------------------------------------------
// METHOD teste_004() CLASS ${nameClass}TestCase
//     Local aHeader   := {}
//     Local cBody     := ""
//     Local cRet      := ""
//     Local cJsonRet  := ""
//     Local cURL      := "/api/rt/saveassetgroup/"
//     Local oHelper   := FWTestHelper():New()
//     Local oResponse := JsonObject():new()

//     cBody := '{"codcfg": "0001","descfg":"Contas a Receber x Contabilidade","tabori":"SE1","descor":"Contas a Receber","tabdes":"CT2","descde":"Lan�amentos Cont�beis",'+;
//              '"fields":{"data_ori":["E1_FILIAL","E1_PREFIXO","E1_NUM","E1_PARCELA","E1_TIPO","E1_NATUREZ","E1_CLIENTE","E1_LOJA","E1_EMISSAO","E1_VENCTO",'+;
//              '                      "E1_VENCREA","E1_VALOR","E1_MOEDA"],'+;
//              '          "data_des":["CT2_FILIAL","CT2_DATA","CT2_LOTE","CT2_SBLOTE","CT2_DOC","CT2_MOEDLC","CT2_DC","CT2_DEBITO","CT2_CREDIT","CT2_VALOR",'+;
//              '          "CT2_HIST","CT2_CCD","CT2_CCC","CT2_ITEMD","CT2_ITEMC","CT2_CLVLDB","CT2_CLVLCR","CT2_ORIGEM"]},'+;
//              '"filter":{"tabori":[{"order":"01","field":"E1_EMISSAO","operation":">="},{"order":"02","field":"E1_EMISSAO","operation":"<="},'+;
//              '                      {"order":"03","field":"E1_PREFIXO","operation":">="},{"order":"04","field":"E1_PREFIXO","operation":"<="},'+;
//              '                      {"order":"05","field":"E1_TIPO","operation":"IN"}],'+;
//              '          "tabdes":[{"order":"01","field":"CT2_DATA","operation":">="},{"order":"02","field":"CT2_DATA","operation":"<="},'+;
//              '                      {"order":"03","field":"CT2_DOC","operation":">="},{"order":"04","field":"CT2_DOC","operation":"<="},'+;
//              '                      {"order":"05","field":"CT2_DEBITO","operation":">="},{"order":"06","field":"CT2_DEBITO","operation":"<="},'+;
//              '                      {"order":"07","field":"CT2_CREDIT","operation":">="},{"order":"08","field":"CT2_CREDIT","operation":"<="}]},'+;
//              '"cidori":"E1_MSUIDT","ciddes":"CT2_MSUIDT",'+;
//              '"regmat":{"rules":[{"idrule":"001","name":"regra_001","linktable":"CV3",'+;
//              '          "rule":{"ori_fields":"E1_MSUIDT","ori_link":"E1_MSUIDT = RTRIM(CV3_IDORIG)",'+;
//              '                      "des_fields":"CT2_MSUIDT","des_link":"CT2_MSUIDT = RTRIM(CV3_IDDEST)","condition":"CV3_IDORIG <> '+ "' '" +' AND CV3_IDDEST <> '+ "' '" +' AND E1_MSUIDT = CV3_IDORIG AND CT2_MSUIDT = CV3_IDDEST"}}]},'+;
//              '"total":{"totalori":[{"label":"Total","total":"E1_VALOR"}],"totaldes":[{"label":"Total a D�bito","condition":"CT2_DC = ' + "'1'" + ' OR CT2_DC = ' + "'3'" + '","total":"CT2_VALOR"},{"label":"Total a Cr�dito","condition":"CT2_DC = ' + "'2'" + ' OR CT2_DC = '+ "'3'" + '","total":"CT2_VALOR"}]}}'
		
//     /* O EncodeUTF8 convertera a string para UTF8, mesmo tipo de encode enviado 
//     pelo front end para a API SaveAssetGroup*/
		
//     cBody := EncodeUtf8(cBody, "cp1252") 

//     oHelper:Activate()

//     aHeader := {"Content-Type: application/json", "Authorization: Basic " + oHelper:UtSetAuthorization('admin','1234') + ""}

//     If !oHelper:UTSetAPI(cURL, "REST")
//         oHelper:UTPutError("Falha ao executar metodo GET - Ocorreu um erro ao conectar-se ao servidor")
//     Else        
//         cJsonRet := oHelper:UTPostWS(cBody,aHeader)  
//         cRet     := oResponse:FromJson(cJsonRet)
				
//         If cJsonRet <> "{}"
//             oHelper:UTPutError("Falha ao gravar matchsetting")
//         EndIf

//     EndIf
		
//     oHelper:AssertTrue(oHelper:lOk, "")

// Return oHelper
`
}