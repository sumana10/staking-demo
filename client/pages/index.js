import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import StakeDetails from "../components/StakeDetails";
import StakeForm from "../components/StakeForm";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-zinc-300 to-indigo-600">
      <div className={` ${styles.container}`}>
        <Header />
        <StakeDetails />
        <StakeForm />
      </div>
    </main>
  );
}