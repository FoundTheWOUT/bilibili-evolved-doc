import { fromJs } from "esast-util-from-js";

/**
 *
 * @param {[]string} propsName
 * @returns
 */
export default function liftUpProps(propsName = []) {
  /**
   * global.[prop] = prop
   */
  const template = (props) => `global.${props} = ${props}`;
  return (ast) => {
    propsName.forEach((prop) => {
      ast.body.push(fromJs(template(prop)));
    });
  };
}
