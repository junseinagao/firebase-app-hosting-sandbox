import { getDateString, getRandomUUID } from "../utils";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const getContentFromDB = async () => {
  const prisma = new PrismaClient();
  const constants = await prisma.cotentMaster.findMany();
  return constants;
};

export default async function Page() {
  const contents = await getContentFromDB();
  return (
    <main className="content">
      <h1 className="heading">A server generated page!</h1>

      <section className="data-container">
        <article className="card">
          <p>Generated</p>
          <h2>{getDateString()}</h2>
        </article>
        <article className="card">
          <p>UUID</p>
          <h2>{getRandomUUID()}</h2>
        </article>
        <article className="card">
          <p>Contetents From PrismaClient</p>
          <div>
            {contents.map((content) => (
              <div key={content.id}>
                <h2>{content.title}</h2>
                <p>{content.content}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
