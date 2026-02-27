function log2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 3000);
  });
}

function main() {
  console.log(1);

  log2()
    .then(() => console.log(3))
    .then(() => console.log(4))
    .then(() => "Kuy")
    .then((v) => console.log(v));
}

async function main2() {
  console.log(1);
  await log2();
  console.log(3);
  console.log(4);
  const v = "Kuy";
  console.log(v);
}

// main();
main2();
