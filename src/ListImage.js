const type = "Apple";
const img ="https://png.pngtree.com/element_our/png_detail/20181214/pngtree-apple-vector-png_268743.jpg";
export function Image() {
  return (
    <img
      src={img}
      alt="Apple Red"
      style={{
        width: "100px",
      }}
    />
  );
}

export default function ListImages() {
  return (
    <section>
      <h1>List {type}</h1>
      <Image />
    </section>
  );
}
