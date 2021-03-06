import React, {ReactPropTypes, Component} from 'react';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends Component{

    //creating constructor to initialise state for the form
    constructor(props, context){
        super(props, context);

        //assigning initial value of state
        this.state = {
            course:{title:""}
        };

        //this is the best place to bind functions to classes, that way it will only be bound once not every time this function is called
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }

    onClickSave(){
        this.props.dispatch(courseActions.createCourse(this.state.course));

        // the input to dispatch is an action, now there is only one reducer that is the root reducer so we dont have to explictly define a reducer as we did with the action, thats what dispatch will do here it will pass the action to the root reducer
    }

    onTitleChange(event){
        //we take out the entire course object, then dissect the title out of it and add in a new title and then set back the course. Why we did it the hard way ie because we only need to change one value; lets suppose course had multiple values then we only wanted to change one value not the entire course ; so take the object out change what you have to and then put back the object as it is... ALT+Z for text wrap in vscode
        const course = this.state.course;
        course.title = event.target.value;
        this.setState({course:course});
    }

    courseRow(course, index){
        return <div key={index}>{course.title}</div>;
    }


    render(){
        return(
            <div>
                <h1>Courses</h1>
                {this.props.courses.map(this.courseRow)}
                <h2>Add Courses</h2>

                <input type="text" onChange={this.onTitleChange} value={this.state.course.title}/>
                

                <input type="button" class="btn btn-primary btn-sm" value="save" onClick={this.onClickSave}/>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps){
    return{
        courses: state.courses
    }
}


export default connect(mapStateToProps)(CoursesPage);