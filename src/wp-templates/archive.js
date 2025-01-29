import { gql } from "@apollo/client";

export default function Archive(props) {
    // Loading state for previews
    if (props.loading) {
        return <>Loading...</>;
    }
    
    return (
        <h2>This is Post Type archive template.</h2>
    );
}