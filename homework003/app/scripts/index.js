//
const PersonForm = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: '', loginId: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleLoginIdChange: function(e) {
    this.setState({loginId: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();
    let loginId = this.state.loginId.trim();
    let startDate = this.state.startDate.trim();
    if (!firstName || !lastName || !loginId || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstName, lastName, loginId, startDate});
    this.setState({firstName: '', lastName: '', loginId: '', startDate: ''});
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
          type="text"
          placeholder="Your login ID"
          value={this.state.loginId}
          onChange={this.handleLoginIdChange} />
        <input
          type="date"
          placeholder="Your start date"
          value={this.state.startDate}
          onChange={this.state.handleStartDateChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

//
const PersonList = React.createClass({
  render: function() {
    const personNodes = this.props.data.map(function(person) {
      return (
        <Person firstName={person.firstName + " "} lastName={person.lastName} key={person.id}>
          {"First Name: " + person.firstName}
          {"Last Name: " + person.lastName}
          {"Login ID: " + person.loginId}
          {"Start Date: " + person.startDate}
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

//
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

//
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
    person.id = Date.now();
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

//
ReactDOM.render(
  <PersonBox url="/api/people" pollInterval={2000} />,
  document.getElementById('content')
);
