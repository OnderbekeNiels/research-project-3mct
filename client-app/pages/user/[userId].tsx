import React from "react";
import ContentBox from "../../components/contentBox";
import NumberBox from "../../components/numberBox";
import Container from "../../components/objects/container";
import { Head2 } from "../../components/objects/head";
import Row from "../../components/objects/row";

export default function UserDetail(){
    return (
      <>
        <Row>
          <Container>
            <div className="grid grid-cols-3 gap-6">
              <ContentBox className="col-span-2">
                <div>image</div>
                <Head2>Rich Harris</Head2>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Itaque asperiores ea libero? Sed at quae ipsa qui, est id
                  laborum minus accusamus perspiciatis accusantium. Ipsam eum
                  minus maiores minima. Temporibus!
                </p>
                <ul>
                  <li>joined</li>
                  <li>age</li>
                  <li>place</li>
                  <li>link</li>
                </ul>
              </ContentBox>
              <ContentBox>
                <Head2>Stats</Head2>
                <div className="grid grid-cols-2 gap-2">
                  <NumberBox
                    value={0}
                    description="Up votes"
                    bgColor="bg-green-500"
                    textColor="text-white"
                  ></NumberBox>
                  <NumberBox
                    value={0}
                    description="Down votes"
                    bgColor="bg-red-500"
                    textColor="text-white"
                  ></NumberBox>
                  <NumberBox
                    value={0}
                    description="Views"
                    bgColor="bg-purple-500"
                    textColor="text-white"
                  ></NumberBox>
                  <NumberBox
                    value={0}
                    description="Reputation"
                    bgColor="bg-orange-500"
                    textColor="text-white"
                  ></NumberBox>
                </div>
              </ContentBox>
              <ContentBox>top tags</ContentBox>
              <ContentBox className="col-span-2">badges</ContentBox>
            </div>
          </Container>
        </Row>
      </>
    );
}