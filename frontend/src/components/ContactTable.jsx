function ContactTable({ contacts }) {
    console.log(contacts);
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((contact) => {
                    return (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.email}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ContactTable;