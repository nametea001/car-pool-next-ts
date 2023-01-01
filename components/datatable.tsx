import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap-v5";

function DataTables() {
  const [products, setProducts] = useState([
    { code: "1", name: "1", category: "1", quantity: "s" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
    { code: "2", name: "2", category: "3", quantity: "4" },
  ]);

  const columns = [
    { field: "code", header: "Code", width: "40%" },
    { field: "name", header: "Name", width: "25%" },
    { field: "category", header: "Category", width: "25%" },
    { field: "quantity", header: "Quantity", width: "25%" },
  ];
  const dynamicColumns = columns.map((col, i) => {
    return (
      <Column
        key={col.field}
        field={col.field}
        header={col.header}
        style={{ width: `${col.width}` }}
        sortable
      />
    );
  });
  return (
    <>
      <div className="data-table ">
        <DataTable
          value={products}
          responsiveLayout="scroll"
          // header footer
          // header="Header"
          // footer="Footer"
          // grid
          showGridlines
          // color row
          stripedRows
          // page and next page
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
          // sort
          removableSort
          // scroll
          scrollable
          scrollHeight="flex"
          scrollDirection="both"
          // collum
          resizableColumns
          columnResizeMode="fit"
        >
          {dynamicColumns}
          <Column
            header="Actions"
            body={(data, props) => (
              <div>
                <Button
                  className="p-button-rounded p-button-text"
                  onClick={(e) => {
                    console.log(data);
                  }}
                />
              </div>
            )}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}

export default DataTables;
