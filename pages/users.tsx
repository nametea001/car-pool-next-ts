import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

// css
import Loading from "../components/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import { Container } from "react-bootstrap";

// datatable
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

function Users({ propDataUsers, propDataUsersRole }: any) {
  // datatable
  const [dataUsers, setDataUsers] = useState(propDataUsers);
  const [dataUsersRole, setDataUsersRole] = useState(propDataUsersRole);
  // datatable
  function Datatable() {
    // modal edit user
    const [showUserEdit, setShowUseredit] = useState(false); //show modal
    // show modal user edit handle
    const [dataUserEdit, setDataUserEdit] = useState<any>({}); //data from colum
    function showEditUser(e: any) {
      if (e) {
        setDataUserEdit(e);
      }
      setShowUseredit(true);
    }
    function showEditUserClose() {
      setShowUseredit(false);
    }
    // showpassword edit
    const [stateShowPasswordEdit, setStateShowPasswordEdit] = useState(false);
    let showIconPasswordEdit = stateShowPasswordEdit
      ? IconSolid.faEyeSlash
      : IconSolid.faEye;
    let showTextPasswordEdit = stateShowPasswordEdit ? "text" : "password";
    function handleShowPasswordEdit() {
      setStateShowPasswordEdit(!stateShowPasswordEdit);
    }
    // showpassword edit confirm
    const [stateShowPasswordConfirmEdit, setStateShowPasswordConfirmEdit] =
      useState(false);
    let showIconPasswordConfirmEdit = stateShowPasswordConfirmEdit
      ? IconSolid.faEyeSlash
      : IconSolid.faEye;
    let showTextPasswordConfirmEdit = stateShowPasswordConfirmEdit
      ? "text"
      : "password";
    function handleShowPasswordConfirmEdit() {
      setStateShowPasswordConfirmEdit(!stateShowPasswordConfirmEdit);
    }
    // option map user Role\
    function userRoleMap() {
      const mapDataUserRole = dataUsersRole.map((data: any) => (
        <option key={data.id} value={data.id.toString()}>
          {data.user_role_name}
        </option>
      ));
      return mapDataUserRole;
    }
    // user edit check data
    const [firstNameEdit, setFirstNameEdit] = useState("");
    const [lastNameEdit, setLastrNameEdit] = useState("");
    function handleEditUser(e: any) {
      // e.preventDefault();
      console.log(e);
    }

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
    const [filters, setFilters] = useState<DataTableFilterMeta>({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      first_name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      "user_roles.user_role_name": {
        value: null,
        matchMode: FilterMatchMode.STARTS_WITH,
      },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // status: { value: null, matchMode: FilterMatchMode.EQUALS },
      // verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });

    const renderHeader = () => {
      return (
        <div className="d-flex justify-content-end">
          {/* <Button
            type="button"
            // variant="warning"
            size="sm"
          >
            <FontAwesomeIcon icon={IconSolid.faPenToSquare} />
            Clear
          </Button> */}
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      );
    };

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      let _filters = { ...filters };

      // @ts-ignore
      _filters["global"].value = value;

      setFilters(_filters);
      setGlobalFilterValue(value);
    };

    // table
    return (
      <>
        <div className="data-table ">
          <DataTable
            value={dataUsers}
            responsiveLayout="scroll"
            showGridlines
            stripedRows
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            removableSort
            scrollable
            scrollHeight="flex"
            resizableColumns
            columnResizeMode="expand"
            emptyMessage="No data found."
            header={renderHeader}
            filters={filters}
            globalFilterFields={[
              "username",
              "first_name",
              "email",
              "user_roles.user_role_name",
            ]}
          >
            <Column field="username" header="Username" sortable />
            <Column
              header="Name"
              field="first_name"
              sortable
              body={(data, prop) => `${data.first_name} ${data.last_name}`}
            />
            <Column field="email" header="Email" sortable />
            {/* <Column field="locale" header="Locale" sortable></Column> */}
            <Column
              field="user_roles.user_role_name"
              header="User Role"
              sortable
            />
            <Column
              header="Actions"
              body={
                (data, props) => (
                  <div>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        showEditUser(data);
                      }}
                    >
                      <FontAwesomeIcon icon={IconSolid.faPenToSquare} />
                    </Button>
                  </div>
                )
                // data.username
              }
            />
          </DataTable>
        </div>

        {/* edit user */}
        <Modal show={showUserEdit} onHide={showEditUserClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={dataUserEdit.username}
                  placeholder="Username"
                  autoComplete="off"
                  // autoFocus
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showTextPasswordEdit}
                    placeholder="Password"
                    autoComplete="off"
                    // autoFocus
                  />
                  <Button
                    // variant="outline-secondary"
                    variant="primary"
                    onClick={handleShowPasswordEdit}
                  >
                    <FontAwesomeIcon icon={showIconPasswordEdit} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                {/* <Form.Label className=""> Confirm Password</Form.Label> */}
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showTextPasswordConfirmEdit}
                    placeholder="Confirm Password"
                    autoComplete="off"
                    // onChange={}
                    // autoFocus
                  />
                  <Button
                    // variant="outline-secondary"
                    variant="primary"
                    onClick={handleShowPasswordConfirmEdit}
                  >
                    <FontAwesomeIcon icon={showIconPasswordConfirmEdit} />
                  </Button>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={dataUserEdit.first_name}
                  placeholder="First Name"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={dataUserEdit.last_name}
                  placeholder="Last Name"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={dataUserEdit.email}
                  placeholder="name@example.com"
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Select defaultValue={dataUserEdit.user_role_id}>
                  {userRoleMap()}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleEditUser} disabled={false}>
              Edit
            </Button>
            <Button variant="danger" onClick={showEditUserClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
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
          {Datatable()}
        </div>
      </div>
    </Container>
  );
}

Users.auth = true;

import { UserFinder } from "../src/Domain/User/Service/UserFinder";
import { UserRoleFinder } from "../src/Domain/UserRole/Service/UserRoleFinder";

export async function getServerSideProps() {
  const userFinder = new UserFinder();
  const userRoleFinder = new UserRoleFinder();
  const propDataUsers = await userFinder.findUsers({});
  const propDataUsersRole = await userRoleFinder.findUsersRoles({});
  return {
    props: { propDataUsers, propDataUsersRole }, // will be passed to the page component as props
  };
}

export default Users;
