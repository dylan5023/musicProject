const CreateParty = /* html */ `
    <article class = "page2">
        <h1> Create a Party</h1>
    </article>`;

export default CreateParty;

export function FormParty(){
    return(
        <form>
            <input type="text" id="partyName" name="partyName" placeholder="Party Name"/>
            <select>
                <option>Private</option>
                <option>Public</option>
            </select>
            <input type="submit" value="continue"/>
        </form>
    );
};


export function Party(){
    return(
        <section>

        </section>
    );
};
