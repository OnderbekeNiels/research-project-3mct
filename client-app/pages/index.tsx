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
                Apollo Client: Memory caching
              </Link>
            </li>
            <li>
              <Link href="https://relay.dev/">Relay</Link>
            </li>
          </ul>
          <Head2>Server side</Head2>
          <ul className="mb-6 list-disc ml-6">
            <li>
              <Link href="https://redis.io/">Memory cache: REDIS</Link>
            </li>
            <li>
              <Link href="https://www.apollographql.com/docs/apollo-server/performance/caching/">
                Apollo Server: Caching directives + Persisted Queries = HTTP
                caching
              </Link>
            </li>
          </ul>
          <Head2>CDN</Head2>
          <ul className="mb-6 list-disc ml-6">
            <li>
              Apollo Server: Caching directives + Persisted Queries = HTTP
              caching &gt; can extend to CDN
            </li>
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
