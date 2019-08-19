const path = require("path");
const fs = require('fs');
const { writeJsonSync } = require('fs-extra');

const config = require("./data/SiteConfig");

let data_json = {}

outputJSON = (publicFolder) => {
    writeJsonSync(publicFolder, data_json, {spaces: '\t'});
  };
  
  
  formatMarkdownItems = (items) => {
    return items.edges.map(edge => {
        return {
          title: edge.node.frontmatter.title,
          path: edge.node.frontmatter.path,
          url: edge.node.frontmatter.url,
          public: edge.node.frontmatter.public,
          enabled: edge.node.frontmatter.enabled,
          tags: edge.node.frontmatter.tags
        };
    });
  };
  
  exports.createPages = ({ graphql, actions }) => {
    const { createRedirect } = actions;
    const createRedirectItem = (item) => {
        createRedirect({
          fromPath: item.path,
          toPath: item.url,
          isPermanent: true,
          force: true
        });
    };
  
    return new Promise((resolve, reject) => {
      if(config.markdown){
        resolve(
          graphql(
            `
              {
                items: allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/content/"}, frontmatter: {enabled: {eq: true}}}) {
                  edges {
                    node {
                      frontmatter {
                        title
                        path
                        url
                        public
                        enabled
                        tags
                      }
                    }
                  }
                  totalCount
                }
              }
            `
          ).then(result => {
            if (result.errors) {
              reject(result.errors)
            }
            let items = formatMarkdownItems(result.data.items);
            items.filter((item) => item.enabled).forEach(item => {
              createRedirectItem(item);
            }); 
            data_json = {items: items};
  
          }));
      }
    });
  };

function buildPrefixer(prefix, ...paths) {
    return (...subpaths) => path.join(prefix, ...paths, ...subpaths)
}

exports.onPostBuild = async ({ store, pathPrefix }, userPluginOptions) => {
    const { program } = store.getState();
    const publicFolder = buildPrefixer(program.directory, `public`);
    outputJSON(publicFolder(`data.json`));
  }