/*
AN ARRAY OF TASKS
We will organize our tasks in an array of objects

CODE TASK 1:
Fill out the following array of objects with at least 2 more
items, each of which is an object with the same structure
as the first one shown. The text in the `description` property
will be displayed as a task in the task list. The `category`
can be one of the options in the HTML dropdown select list:
shopping, household, school, work, other
*/
var tasks = [
  {description: "do Programming Basics homework", category: "school"},
  {description: "go grocery shopping", category: "shopping"},
  {description: "do laundry", category: "household"}
];

/*
Here, we select the button we'll use to add tasks to the list.
Then, we bind a click event to that button so that every time
it is clicked, an update function is called.
*/
var addButton = d3.select("#add-item");
addButton.on("click", updateTaskList);

/*
Inside this function, we will do all the things necessary
to make the task list functional
*/
function updateTaskList() {
  /*
  CODE TASK 2:

  Create a variable named `tasklist` whose value is a
  selection of the <ul> element in the HTML that has
  an ID of 'task-list'. Use d3.select() for this.
  */
  d3.selectAll("li").remove();

  var tasklist = d3.select("#task-list");

  var taskDescription = d3.select("#input-item").property("value");
  var taskCategory = d3.select("#choose-category").property("value");
  if(taskDescription !== "") {
    tasks.push({description: taskDescription, category: taskCategory});
  }


  /*
  CODE TASK 3:

  We can use the data join pattern to draw not only SVG
  shapes -- we can also use it to create any other kind
  of HTML element dynamically based on a data set.

  Use a data join to create new <li> elements that
  will be appended to the <ul id='task-list'>, from
  Code Task 2 above.

  The data you will be joining to these new <li> elements
  are found in the variable `tasks`, i.e., you will
  create one new <li> element for each object in `tasks`.

  Using selection.text(), the text inside of each <li>
  element created as a result of this data join should
  be derived from the `description` property inside
  each object in `tasks`.
  */

  var li = tasklist.selectAll("li")
    .data(tasks)
    .enter()
    .append("li")
      .text(function(d) { return d.description; });

  var close = li.append("span")
    .attr("class", "close")
    .html("\u00D7");

  close.on("click", function(d) {
    var i = tasks.indexOf(d);
    tasks.splice(i,1);
    d3.select(this.parentNode).remove();
  })

}

/*
Since the function updateTaskList() also generates the
task list itself, we need to call it first on page load
so that an initial task list appears
*/
updateTaskList();
