#include "PROTHEUS.CH"

//-------------------------------------------------------------------
/*/{Protheus.doc} CTBATestGroup

Criacao da classe principal

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
@see        FWDefaultTestSuit , FWDefaultTestCase
/*/
//-------------------------------------------------------------------
CLASS CTBATestGroup FROM FWDefaultTestSuite
	METHOD CTBATestGroup() CONSTRUCTOR
ENDCLASS

//-----------------------------------------------------------------
/*/{Protheus.doc} CTBATestGroup
Instancia os casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD CTBATestGroup() CLASS CTBATestGroup
	_Super:FWDefaultTestSuite()
	Self:AddTestCase(CTBATestCase():CTBATestCase())
Return
	