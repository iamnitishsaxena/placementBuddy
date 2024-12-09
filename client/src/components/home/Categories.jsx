import { Button, Table, TableCell, TableHead, TableBody, TableRow, styled } from "@mui/material";
import { categories } from "../../constants/data";

const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);
`;

const StyledButton = styled(Button)`
    background-color: #6495ED;
    margin: 20px;
    width: 85%;
    color: #fff;
`;

const Categories = () => {
    return (
        <>
            <StyledButton variant="contained">Add the Category</StyledButton>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    {category.type}
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>        
    )
}

export default Categories;