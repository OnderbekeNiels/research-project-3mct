import Link from "next/link";
import ContentBox from "../components/contentBox";
import Container from "../components/objects/container";
import { Head1, Head2 } from "../components/objects/head";
import Row from "../components/objects/row";

export default function Home() {
  return (
    <Row>
      <Container>
        <ContentBox className="mt-12">
          <Head1 className="mb-0">
            Welcome to my researchproject, select a tab to start the GraphQL
            testing.
          </Head1>
          <p className="mb-6">
            This frontend is made to test the diffrent caching strategies that
            are possible with GraphQL.
          </p>
          <Head2>Client side</Head2>
          <ul className="mb-6 list-disc ml-6">
            <li className="">
              <Link href="https://www.apollographql.com/docs/react/caching/cache-configuration/">
                InMemory caching with Apollo Client v3
              </Link>
            </li>
            <li>
              <Link href="https://formidable.com/open-source/urql/">Urql</Link>
            </li>
          </ul>
          <Head2>Server side</Head2>
          <ul className="mb-6 list-disc ml-6">
            <li>
              <Link href="https://redis.io/">
                Memory response caching using Redis
              </Link>
            </li>
            <li>
              <Link href="https://www.apollographql.com/docs/apollo-server/performance/caching/">
                HTTP caching using Apollo Server and Automatic Persisted Queries
              </Link>
            </li>
          </ul>
          <Head2>CDN</Head2>
          <ul className="mb-6 list-disc ml-6">
            <li>
              <Link href="https://graphcdn.io/">GraphCDN</Link>
            </li>
          </ul>
          <p>Research by Niels Onderbeke - Howest MCT, BE</p>
        </ContentBox>
      </Container>
    </Row>
  );
}
