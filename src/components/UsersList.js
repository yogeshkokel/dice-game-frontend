import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersList } from '../store/users/userActions';

function UsersList(props) {
    const users = useSelector(state => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsersList())
    }, [])

    const downloadCSV = () => {
        var rows = document.querySelectorAll('table#' + "users" + ' tr');
        var csv = [];
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length; j++) {
                var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                data = data.replace(/"/g, '""');
                row.push('"' + data + '"');
            }
            csv.push(row.join(';'));
        }
        var csv_string = csv.join('\n');
        var filename = 'export_users' + '_' + new Date().toLocaleDateString() + '.csv';
        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const downloadPDF = () => {
        var sTable = document.getElementById('users-div').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write(`<title>${'export_users' + '_' + new Date().toLocaleDateString()}</title>`);
        win.document.write(style);
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);
        win.document.write('</body></html>');

        win.document.close();

        win.print();
    }

    return (
        <div>
            {
                users && users.loading
                    ?
                    <div className="text-center">Loading...</div>
                    : users && users.users_list && users.users_list.length > 0 ?
                        <div>
                            <div id="users-div">
                                <table id="users" className="users">
                                    <thead>
                                        <tr>
                                            <th>Nickname</th>
                                            <th>Score</th>
                                            <th>Time Taken</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.users_list.map((user, index) => (
                                            <tr key={index}>
                                                <td>{user.nickname}</td>
                                                <td>{user.score}</td>
                                                <td>{user.timetaken ? user.timetaken : 0} secs</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="export-flex">
                                <button className="button" onClick={downloadCSV}>Export as CSV</button>
                                <button className="button" onClick={downloadPDF}>Export as PDF</button>
                            </div>
                        </div>
                        : users && users.users_list_error ?
                            <div class="alert">
                                <strong>Error!</strong> {users.users_list_error}
                            </div>
                            : null
            }
        </div>
    );
}

export default UsersList;