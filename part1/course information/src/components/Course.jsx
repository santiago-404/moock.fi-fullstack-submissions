import { Fragment } from "react"

export const Courses = ({courses}) => {
  return (
    <div>
      {courses.map(course => {
        return <Course key={course.id} course={course}/>
      })}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <Fragment>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Footer parts={course.parts}/>
    </Fragment>
  )
}

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => {
        return (
          <Part key={part.id} partName={part.name} exercises={part.exercises}/>
        )
      })}
    </div>
  )
}

const Part = ({partName, exercises}) => {
  return (
    <Fragment>
      <p>{partName} {exercises}</p>
    </Fragment>
  )
}

const Footer = ({parts}) => {

  let sum = 0;
  parts.forEach(part => {
    sum += part.exercises;
  });

  return (
    <Fragment>
      <b>Total of {sum} exercises</b>
    </Fragment>
  )
}
