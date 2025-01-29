import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

export default function Footer(props) {
    const socialHandle = useQuery(Footer.query);

    const { loding, data } = socialHandle;

    console.log(data);

    return (
        <ul>
            <li>Fcebook:</li>
        </ul>
    );
}

Footer.query = gql`
    query FooterCompQuery {
        acfSocialHandles {
            socialHandles {
                acfSocialFacebook
                acfSocialInstagram
                acfSocialTwitter
            }
        }
    }
`;