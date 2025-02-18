export default function Category(props) {
    // Loading state for previews
    if (props.loading) {
        return <>Loading...</>;
    }

    return <h2>This is a category template.</h2>;
}
