import React from 'react';

function UserRow(props) {
    var auser = props.boss.state.aauser[props.ix];
    if (props.ix > 0) {
        //assert [0] is dummy 0, replace /w zapUser button
        auser[0] = (
            <button onClick={() => {
                    props.boss.zapUser(props.ix); }}>X</button>
        );
    }
    return (
        <tr>
            {auser.map((item, ix) => (
                <td key={ix}>{item}</td>
            ))}
        </tr>
    );
}

function InputNewuserText(props) {
    return (
        <div className="formel">
            {props.labelpre}
            <input
                type="text"
                size="22"
                value={props.boss.state['newuser' + props.fldid]}
                onChange={(event) => {
                    props.boss.updatNewuser(event, 'value', props.fldid);
                }}
            />
            {props.labelpost}
        </div>
    );
}

function InputNewuserSelect(props) {
    var aopt = props.choices.split('|');
    return (
        <div className="formel">
            {props.labelpre}
            <select
                name={props.fldid}
                value={props.boss.state['newuser' + props.fldid]}
                onChange={(event) => {
                    props.boss.updatNewuser(event, 'select', props.fldid);
                }}
            >
                {aopt.map((item, ix) => (
                    <option key={ix} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {props.labelpost}
        </div>
    );
}

function InputNewuserCbox(props) {
    return (
        <div className="formel">
            {props.labelpre}
            <input
                type="checkbox"
                name="trCb"
                checked={props.boss.state['newuser' + props.fldid]}
                onChange={(event) => {
                    props.boss.updatNewuser(event, 'checked', props.fldid);
                }}
            />
            {props.labelpost}
        </div>
    );
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updatNewuser = this.updatNewuser.bind(this);
        this.submitNewuser = this.submitNewuser.bind(this);
        this.zapUser = this.zapUser.bind(this);
    }
    updatNewuser(event, targetprop, fldid) {
        var val =
            targetprop === 'select'
                ? event.target.options[event.target.selectedIndex].value
                : event.target[targetprop];
        console.log('uNu(%o,%s,%s) val=%s', event, targetprop, fldid, val);
        var o = {};
        o['newuser' + fldid] = val;
        this.setState(o);
    }
    submitNewuser(event) {
        var taauser = this.state.aauser;
        var ress = '';
        if (this.state.newuserResa) ress += 'a';
        if (this.state.newuserResb) ress += 'b';
        if (this.state.newuserResc) ress += 'c';
        taauser.push([
            0, //dummy
            this.state.newuserSid,
            this.state.newuserFrst,
            this.state.newuserLast,
            this.state.newuserActy,
            ress,
        ]);
        this.resetNew(taauser);
        //return false ;
        event.preventDefault();
    }
    zapUser(ix) {
        var taauser = this.state.aauser;
        taauser.splice(ix, 1);
        this.setState({ aauser: taauser });
    }
    resetNew(aau) {
        this.setState({
            //clear new-user fields ...
            newuserSid: '',
            newuserFrst: '',
            newuserLast: '',
            newuserActy: 'Hiking',
            newuserResa: false,
            newuserResb: false,
            newuserResc: false,
            //and update or init array of array of users:
            aauser: aau,
        });
    }
    componentWillMount() {
        this.resetNew([['Remove', 'SID','FirstName', 'LastName', 'Activity', 'Restrictions']]);
    }
    render() {
        return (
            <div>
                <form onSubmit={this.submitNewuser}>
                    <InputNewuserText boss={this} key="Sid" fldid="Sid" labelpre="Student ID" />
                    <InputNewuserText boss={this} key="Frst" fldid="Frst" labelpre="First Name" />
                    <InputNewuserText boss={this} key="Last" fldid="Last" labelpre="Last Name" />
                    <InputNewuserSelect
                        boss={this}
                        fldid="Acty"
                        labelpre="Select Activity"
                        choices="Hiking|Swimming|Cooking|Painting"
                    />
                    <InputNewuserCbox
                        boss={this}
                        key="Resa"
                        fldid="Resa"
                        labelpost="a) Dietary Restrictions"
                    />
                    <InputNewuserCbox
                        boss={this}
                        key="Resb"
                        fldid="Resb"
                        labelpost="b) Physical Disabilities"
                    />
                    <InputNewuserCbox
                        boss={this}
                        key="Resc"
                        fldid="Resc"
                        labelpost="c) Medical Needs"
                    />
                    <input type="submit" value="Submit" />
                </form>
                <table>
                    <tbody>
                        {this.state.aauser.map((item, ix) => (
                            <UserRow key={ix} ix={ix} boss={this} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;