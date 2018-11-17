# Design Specifications for History Inventory Application

ReactJS component structure:
- ObjectBox
  - ObjectList
    - Object
  - ObjectForm

MongoDB document structure:
object {
	"id": random_integer
	"name": object_name
	"size": object_size
	"desc": object_description
	"date": object_age
	"origin": location_created
	"manufacturer": company_name
	"significance": historical_impact
	"related": related_objects
}
