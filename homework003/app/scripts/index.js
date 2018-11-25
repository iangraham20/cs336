//
const PersonForm = React.createClass({
  getInitialState: function() {
    return {firstName: '', lastName: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstName: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastName: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let firstName = this.state.firstName.trim();
    let lastName = this.state.lastName.trim();
    if (!lastName || !firstName) {
      return;
    }
    this.props.onPersonSubmit({firstName, lastName});
    this.setState({firstName: '', lastName: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange} />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.lastName}
          onChange={this.handleLastNameChange} />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

//
const PersonList = React.createClass({
  render: function() {
    const personNodes = this.props.data.map(function(person) {
      return (
        <Person firstName={person.firstName} key={person.id}>
          {person.lastName}
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
        <h2 className="personFirstName">
          {this.props.firstName}
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
