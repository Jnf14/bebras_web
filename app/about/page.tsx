export default async function HomePage() {
  return (
    <div className="flex justify-center my-20 mx-60">
      <div className="flex flex-col items-center gap-14">
        <h1 className=" font-bold text-lg">
          Bienvenue sur la nouvelle plateforme Bebras !
        </h1>

        <span className=" text-wrap">
          Son objectif est de répertorier les tâches des anciens concours Castor
          Informatique et d'offrir la possibilité de les rechercher par thème,
          âge ou mot-clé.
        </span>
      </div>
    </div>
  );
}
