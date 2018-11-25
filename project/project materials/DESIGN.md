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
	"description": Item_description
	"manufactureDate": Item_age
	"origin": location_created
	"manufacturer": company_name
	"significance": historical_impact
	"related": related_Items
}
