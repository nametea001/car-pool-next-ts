import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button } from "react-bootstrap-v5";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Container } from "react-bootstrap-v5";

function Users() {
  const router = useRouter();
  return (
    <Container fluid className="content">
      <Head>
        <title> Master | Users </title>
      </Head>
      <div className="row">
        <div className="col">
          <h1>
            <FontAwesomeIcon icon={IconSolid.faUserFriends} />
            Users
          </h1>
          <hr />
          {/* <DataTables /> */}
          {datatable([])};
        </div>
      </div>
    </Container>
  );
}
Users.auth = true;

// datatable
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
function datatable(value: []) {
  return (
    <div className="data-table ">
      <DataTable
        value={value}
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
  );
}

export default Users;
