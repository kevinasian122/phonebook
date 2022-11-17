const People = ({show, handleDel}) => {
    return (
        <div>
        {show.map(person => 
            
            <div key = {person.id}>{person.name} {person.number}
            <button onClick={() => handleDel(person.id)}>Delete</button></div> 
        )}
      </div>
    )
}

export default People