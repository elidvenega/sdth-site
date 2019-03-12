import React from "react"
import Img from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

import communityIcon from "Images/icon_community.svg"
import educationIcon from "Images/icon_education.svg"
import inclusionIcon from "Images/icon_inclusion.svg"
import innovationIcon from "Images/icon_innovation.svg"
import talentIcon from "Images/icon_talent.svg"
import {
  Collaboration,
  CollabIcon,
  Description,
  HomeTitle,
  PillarDescription,
  PillarIcon,
  PillarRow,
  ThreeStep,
  WhatIsSDTH
} from "./styles"

const pillarIcons = {
  community: communityIcon,
  education: educationIcon,
  inclusion: inclusionIcon,
  innovation: innovationIcon,
  talent: talentIcon
}

function Home() {
  const {
    markdownRemark: { frontmatter },
    ...icons
  } = useStaticQuery(homeQuery)

  return (
    <main>
      <HomeTitle>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <WhatIsSDTH>
            <div style={{ maxWidth: "570px", zIndex: 2 }}>
              <h2 style={{ color: "white" }}>
                {frontmatter.mainTitle}
              </h2>

              <div
                dangerouslySetInnerHTML={{
                  __html: frontmatter.mainDescription
                }}
                style={{ fontSize: "1.5rem" }}
              />
            </div>
          </WhatIsSDTH>
        </div>
      </HomeTitle>
      <Collaboration>
        <h2>{frontmatter.collabTitle}</h2>
        <Description
          dangerouslySetInnerHTML={{
            __html: frontmatter.collabDescription
          }}
        />
      </Collaboration>

      <ThreeStep>
        <aside style={{ maxWidth: "1200px" }}>
          {frontmatter.collabItems.map((c, i) => {
            const { title, description } = c.collabItem
            const icon = icons[title]

            return (
              <div key={title}>
                <CollabIcon>
                  <Img fluid={icon.childImageSharp.fluid} alt={title} />
                </CollabIcon>
                <h3>
                  {i + 1}. {title}
                </h3>

                <p className="description">{description}</p>
              </div>
            )
          })}
        </aside>
      </ThreeStep>

      <PillarDescription>
        <h2>{frontmatter.pillarsTitle}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: frontmatter.pillarsDescription
          }}
        />
      </PillarDescription>
      <PillarRow>
        {frontmatter.pillarIcons.map(pillar => (
          <PillarIcon
            to={`/${pillar.pillarItem.title}`}
            key={pillar.pillarItem.title}
            background={pillar.pillarItem.background}
          >
            <div>
              <img
                alt={pillar.pillarItem.title}
                src={pillarIcons[pillar.pillarItem.title]}
                height="75"
              />
              <h4>{pillar.pillarItem.title}</h4>
            </div>
            <p>{pillar.pillarItem.description}</p>
          </PillarIcon>
        ))}
      </PillarRow>
    </main>
  )
}

export default Home

const homeQuery = graphql`
  query HOME_QUERY {
    markdownRemark(frontmatter: { path: { eq: "home" } }) {
      frontmatter {
        mainTitle
        mainDescription
        collabTitle
        collabDescription
        collabItems {
          collabItem {
            title
            description
          }
        }
        pillarsTitle
        pillarsDescription
        pillarIcons {
          pillarItem {
            title
            description
            background
          }
        }
      }
    }

    connect: file(relativePath: { eq: "connect-new.png" }) {
      ...childSharp
    }

    empower: file(relativePath: { eq: "empower-new.png" }) {
      ...childSharp
    }
    inform: file(relativePath: { eq: "inform-new.png" }) {
      ...childSharp
    }
  }
`

export const fragment = graphql`
  fragment childSharp on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
