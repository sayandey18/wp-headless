import Link from "next/link";

export default function Header({ menuItems }) {
    return (
        <ul>
            {menuItems.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.uri}
                        target={item.target === "_blank" ? "_blank" : undefined}
                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    >
                        {item.label}
                    </Link>

                    {/* Check if child items are available */}
                    {item.childItems?.nodes?.length > 0 && (
                        <ul>
                            {item.childItems.nodes.map((child) => (
                                <li key={child.id}>
                                    <Link 
                                        href={child.uri}
                                        target={child.target === "_blank" ? "_blank" : undefined}
                                        rel={child.target === "_blank" ? "noopener noreferrer" : undefined}
                                    >
                                        {child.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}
