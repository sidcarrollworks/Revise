// its important to know what is going on with socket IO, Its a simple package that can get pretty messy real fast.
// in order to keep everything neat and clean when it comes to rooms and events I am gonna write down everything here and
// use it for referance...

// "/*":{} are for namespaces
// "":{} are for rooms
// cli. or serv. depending on who emits/recives it
// "cli|serv.emit" is for cli or serv emiting 
// "cli|serv.on" is for cli or serv reciving
// they are wrapped in an array
// the first elem in arr is the event name
// the second element is an explanation of what the payload will be
// the thrid will be explanation/documentation


  //rooms 
{
  "proj:{pid}": {
    "cli.on": [
      "pUpdate",
      "{new_rev_arr}",
      "sends new rev arr to update project page and render new rev"
    ],
    "cli.on": [
      "pUpdate",
      "{new_rev_arr}",
      "sends new rev arr to reload comments"
    ]
  }
  // "dash:{_id}": {
  //   "serv.emit": [
  //     "plUpdate"
  //     "{new_project_list}",
  //     "sent everytime"
  //   ],
  //   "cli.on": [
  //     "plUpdate",
  //     "{new_project_list}",
  //     "sends new project list to refresh page"
  //   ]
  // }
}
