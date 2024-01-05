export function getGroupTemplate(nameClass: string) {
	return `#include "PROTHEUS.CH"

//-------------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestGroup

Criacao da classe principal

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
@see        FWDefaultTestSuit , FWDefaultTestCase
/*/
//-------------------------------------------------------------------
CLASS ${nameClass}TestGroup FROM FWDefaultTestSuite
	METHOD ${nameClass}TestGroup() CONSTRUCTOR
ENDCLASS

//-----------------------------------------------------------------
/*/{Protheus.doc} ${nameClass}TestGroup
Instancia os casos de teste

@author     COLOQUE O AUTOR
@since      COLOQUE A DATA
@version    1.0
/*/
//-----------------------------------------------------------------
METHOD ${nameClass}TestGroup() CLASS ${nameClass}TestGroup
	_Super:FWDefaultTestSuite()
	Self:AddTestCase(${nameClass}TestCase():${nameClass}TestCase())
Return
	`
}