export function getSuiteTemplate(nameClass: string) {
  return `#include "PROTHEUS.CH"

//-------------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestSuite

Criacao da classe principal

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
@see        FWDefaultTestSuit , FWDefaultTestCase
/*/
//-------------------------------------------------------------------
CLASS ${nameClass}TestSuite FROM FWDefaultTestSuite
	DATA aParam

	// Criacao dos metodos na classe
	METHOD ${nameClass}TestSuite() CONSTRUCTOR
	METHOD SetUpSuite()
	METHOD TearDownSuite()
ENDCLASS

//-----------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestSuite
Instancia os casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD ${nameClass}TestSuite() CLASS ${nameClass}TestSuite
	_Super:FWDefaultTestSuite()
	Self:AddTestSuite(${nameClass}TestGroup():${nameClass}TestGroup())
Return

//-----------------------------------------------------------------
/*/{Protheus.doc} SetUpSuite
Prepara o ambiente para execucao dos casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD SetUpSuite() CLASS ${nameClass}TestSuite
	Local oHelper := FWTestHelper():New()

	oHelper:UTOpenFilial("T1", "D MG 01 ", "SIGAMDI",, "admin", "1234")
	oHelper:Activate()
Return oHelper

//-----------------------------------------------------------------
/*/{Protheus.doc} TearDownSuite
Finaliza o ambiente apos a execucao dos casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD TearDownSuite() CLASS ${nameClass}TestSuite
	Local oHelper := FWTestHelper():New()

	oHelper:UTCloseFilial()
Return oHelper
	`;
}