import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, Modal } from "react-bootstrap";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Container } from "react-bootstrap";

// datatable
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { UserFinder } from "../src/Domain/User/Service/UserFinder";
function Users({ propDataUsers }: any) {
  const router = useRouter();

  // datatable
  const [dataUsers, setrDataUsers] = useState(propDataUsers);
  function datatable(value: []) {
    // modal edit user

    // table
    return (
      <>
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
            // scrollDirection="both"
            // collum
            resizableColumns
            // columnResizeMode="fit"
            columnResizeMode="expand"
          >
            <Column field="username" header="Username"></Column>
            {/* <Column field={fullName} header="Name"></Column> */}
            <Column
              header="Name"
              body={(data, prop) => `${data.first_name} ${data.last_name}`}
            ></Column>
            <Column field="email" header="Email"></Column>
            <Column field="locale" header="Locale"></Column>
            <Column
              field="user_roles.user_role_name"
              header="User Role"
            ></Column>
            <Column
              header="Actions"
              body={
                (data, props) => (
                  <div>
                    <Button variant="warning" size="sm" onClick={() => {}}>
                      <FontAwesomeIcon icon={IconSolid.faPenToSquare} />
                    </Button>
                  </div>
                )
                // data.username
              }
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }
  // page
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
          {datatable(dataUsers)};
        </div>
      </div>
    </Container>
  );
}
Users.auth = true;

export async function getServerSideProps() {
  const userFinder = new UserFinder();
  const propDataUsers = await userFinder.findUsers([]);
  return {
    props: { propDataUsers }, // will be passed to the page component as props
  };
}

export default Users;
