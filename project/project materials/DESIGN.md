# Design Specifications for Museum Holdings

ReactJS component structure:
- ItemBox
  - ItemList
    - Item
  - ItemForm

MongoDB document structure:
Item {
	"id": random_integer
	"name": Item_name
	"origin": location_created
	"description": Item_description
	"manufacturer": company_name
	"manufactureDate": Item_age
	"significance": historical_impact
	"related": related_Items
}
