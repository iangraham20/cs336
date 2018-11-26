const ItemForm = React.createClass({
  getInitialState: function() {
    return {id: '', name: '', origin: '', description: '', manufacturer: '', manufactureDate: '', significance: '', relatedItems: ''};
  },
  handleIdChange: function(e) {
    this.setState({id: e.target.value});
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleOriginChange: function(e) {
    this.setState({origin: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  handleManufacturerChange: function(e) {
    this.setState({manufacturer: e.target.value});
  },
  handleManufactureDateChange: function(e) {
    this.setState({manufactureDate: e.target.value});
  },
  handleSignificanceChange: function(e) {
    this.setState({significance: e.target.value});
  },
  handleRelatedItemsChange: function(e) {
    this.setState({relatedItems: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let id = this.state.id.trim();
    let name = this.state.name.trim();
    let origin = this.state.origin.trim();
    let description = this.state.description.trim();
    let manufacturer = this.state.manufacturer.trim();
    let manufactureDate = this.state.manufactureDate.trim();
    let significance = this.state.significance.trim();
    let relatedItems = this.state.relatedItems.trim();
    if (!id || !name || !origin || !description || !manufacturer || !manufactureDate || !significance || !relatedItems) {
      return;
    }
    this.props.onItemSubmit({id, name, origin, description, manufacturer, manufactureDate, significance, relatedItems});
    this.setState({id: '', name: '', origin: '', description: '', manufacturer: '', manufactureDate: '', significance: '', relatedItems: ''});
  },
  render: function() {
    return (
      <form className="itemForm" onSubmit={this.handleSubmit}>
        <input
          type="number"
          placeholder="Id number"
          value={this.state.id}
          onChange={this.handleIdChange} />
        <input
          type="text"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleNameChange}
        <input
          type="text"
          placeholder="Location of origin"
          value={this.state.origin}
          onChange={this.handleOriginChange} />
        <input
          type="text"
          placeholder="Description of the item"
          value={this.state.description}
          onChange={this.handleDescriptionChange} />
        <input
          type="text"
          placeholder="Name of manufacturer"
          value={this.state.manufacturer}
          onChange={this.handleManufacurerChange} />
        <input
          type="date"
          placeholder="Date of manufacturing"
          value={this.state.manufactureDate}
          onChange={this.handleManufactureDateChange} />
        <input
          type="text"
          placeholder="Historical significance of the item"
          value={this.state.significance}
          onChange={this.handleSignificanceChange} />
        <input
          type="text"
          placeholder="A list of related items"
          value={this.state.relatedItems}
          onChange={this.handleRelatedItemsChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

//
const ItemList = React.createClass({
  render: function() {
    const itemNodes = this.props.data.map(function(item) {
      return (
        <Item name={item.name} key={item.id}>
          <div>{"ID number: " + item.id}</div>
          <div>{"Item Name: " + item.name}</div>
          <div>{"Origin: " + item.origin}</div>
          <div>{"Description: " + item.description}</div>
          <div>{"Manufacturer: " + item.manufacturer}</div>
          <div>{"Manufacture Date: " + item.manufactureDate}</div>
          <div>{"Significance: " + item.significance}</div>
          <div>{"Related Items: " + item.relatedItems}</div>
        </Item>
      );
    });
    return (
      <div className="itemList">
        {itemNodes}
      </div>
    );
  }
});

//
const Item = React.createClass({
  render: function() {
    return (
      <div className="item">
        <h2 className="itemName">
          {this.props.name}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

//
const ItemBox = React.createClass({
  loadItemsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleItemSubmit: function(item) {
    let items = this.state.data;
    let newItems = items.concat([item]);
    this.setState({data: newItems});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: items});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadItemsFromServer();
    setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="itemBox">
        <h1>Items</h1>
        <ItemList data={this.state.data} />
        <ItemForm onItemSubmit={this.handleItemSubmit} />
      </div>
    );
  }
});

//
ReactDOM.render(
  <ItemBox url="/items" pollInterval={2000} />,
  document.getElementByOrigin('content')
);
