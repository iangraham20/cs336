const PersonForm = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', id: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleIdChange: function(e) {
    this.setState({id: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();
    let id = this.state.id.trim();
    let startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !id || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstName, lastName, id, startDate});
    this.setState({firstName: '', lastName: '', id: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your first name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange} />
        <input
          type="text"
          placeholder="Your last name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange} />
        <input
          type="number"
          placeholder="Your login ID"
          value={this.state.id}
          onChange={this.handleIdChange} />
        <input
          type="date"
          value={this.state.startDate}
          onChange={this.handleStartDateChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});
const PersonList = React.createClass({
  render: function() {
    const personNodes = this.props.data.map(function(person) {
      return (
        <Person firstName={person.firstName + " "} lastName={person.lastName} key={person.id}>
          <div>{"First Name: " + person.firstName}</div>
          <div>{"Last Name: " + person.lastName}</div>
          <div>{"ID number: " + person.id}</div>
          <div>{"Start Date: " + person.startDate}</div>
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});
const Person = React.createClass({
  render: function() {
    return (
      <div className="person">
        <h2 className="personName">
          {this.props.firstName}
          {this.props.lastName}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
const PersonBox = React.createClass({
  loadPeopleFromServer: function() {
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
  handlePersonSubmit: function(person) {
    let people = this.state.data;
    let newPeople = people.concat([person]);
    this.setState({data: newPeople});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: people});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPeopleFromServer();
    setInterval(this.loadPeopleFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <PersonList data={this.state.data} />
        <PersonForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});
ReactDOM.render(
  <PersonBox url="/people" pollInterval={2000} />,
  document.getElementById('content')
);
