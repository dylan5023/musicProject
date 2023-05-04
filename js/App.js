const { useState, useEffect } = require("react");

function App() {
  const [usersList, setUsers] = useState([]);
  useEffect(
    function(){
      fetch("http://localhost:8070/users")
      .then((response) => response.json())
      .then(setUsers)
    },
    []
  );
}

export default App;