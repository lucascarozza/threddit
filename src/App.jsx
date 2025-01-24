import styles from "./App.module.css";
import Feed from "./components/Feed/Feed";
import Header from "./components/Header/Header";
import SubredditsList from "./components/SubredditsList/SubredditsList";

const App = () => {
  return (
    <div>
      <div>
        <Header />
        <div className={styles.content}>
          <Feed />
          <SubredditsList />
        </div>
      </div>
    </div>
  )
}

export default App;