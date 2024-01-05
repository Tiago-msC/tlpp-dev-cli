#include "PROTHEUS.CH"

//-------------------------------------------------------------------
/*/{Protheus.doc} CTBATestSuite

Criacao da classe principal

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
@see        FWDefaultTestSuit , FWDefaultTestCase
/*/
//-------------------------------------------------------------------
CLASS CTBATestSuite FROM FWDefaultTestSuite
	DATA aParam

	// Criacao dos metodos na classe
	METHOD CTBATestSuite() CONSTRUCTOR
	METHOD SetUpSuite()
	METHOD TearDownSuite()
ENDCLASS

//-----------------------------------------------------------------
/*/{Protheus.doc} CTBATestSuite
Instancia os casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD CTBATestSuite() CLASS CTBATestSuite
	_Super:FWDefaultTestSuite()
	Self:AddTestSuite(CTBATestGroup():CTBATestGroup())
Return

//-----------------------------------------------------------------
/*/{Protheus.doc} SetUpSuite
Prepara o ambiente para execucao dos casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD SetUpSuite() CLASS CTBATestSuite
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
METHOD TearDownSuite() CLASS CTBATestSuite
	Local oHelper := FWTestHelper():New()

	oHelper:UTCloseFilial()
Return oHelper
	