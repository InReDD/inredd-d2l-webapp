import "./styles.scss";

export default function Props({ items }) {
  return (
    <div className={"mt-xxs table-doc"}>
      <p>Props:</p>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Tipo</th>
            <th scope="col">Padrão</th>
            <th scope="col">Obrigatório</th>
            <th scope="col">Opções</th>
            <th scope="col">Descrição</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index}>
              <th>{item.name}</th>
              <td>{item.type}</td>
              <td>{item.default || "-"}</td>
              <td>{item.required ? "sim" : "não"}</td>
              <td>{item.options || "-"}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
