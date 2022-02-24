<template>
  <div>
    <header class="sticky-top container-fluid p-2" id="eco-quiz-header">
      <div class="logo d-flex">
        <img class="img-fluid" src="images/logos.png" alt="ECO Logo" />
      </div>
      <!-- SP: DEBUG -->
      <i
        class="fa fa-bug debug fa-3x text-secondary"
        role="button"
        @click="toggleDebug"
        aria-hidden="true"
      ></i>
    </header>
    <section
      id="main-content"
      class="container d-flex flex-column justify-content-center px-4"
      v-if="finishedQuiz == false"
    >
      <!-- SP: INTRO -->
      <div class="row" v-if="beginQuiz == false">
        <div
          class="
            col-xl-8 col-lg-9
            mx-auto
            d-flex
            flex-column
            align-items-center
          "
        >
          <h1 class="fw-bold mb-4 w-100 h2">
            Are you ready for Project Management Essentials?
          </h1>
          <h4 class="mb-4">
            ECO Canada and Meridus Management Inc. have partnered to provide
            skill development in critical project management concepts through
            online learning.
          </h4>
          <p class="mb-4">
            Meridus’ course, Project Management Essentials, is an interactive
            online course that addresses fundamental skill gaps related to
            communication and management of key project constraints including
            scope, budget, schedule, and quality. This new online course is
            available through ECO Canada’s website and is a practical learning
            tool, regardless of the individual’s role in the project.
          </p>
          <button
            class="
              btn btn-success btn-lg
              d-inline-flex
              mx-auto
              align-items-center align-self-center
            "
            @click="beginQuiz = true"
          >
            Begin Quiz
            <i
              class="fa fa-angle-double-right fa-2x ms-3"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
      <!-- SP: QUIZ MAIN -->
      <div class="row" id="quizMain" v-if="beginQuiz">
        <div
          class="col-xl-6 col-lg-9 mx-auto"
          v-if="chosenQuestions.length > 0"
        >
          <h2 class="fw-bold">
            {{ currentQuestion + 1 }} )
            {{
              chosenQuestions[currentQuestion]["question-text"].replaceAll(
                "\\",
                ""
              )
            }}
          </h2>

          <form :name="'answers_' + currentQuestion" class="mt-4 answers">
            <div
              v-for="(answer, index) in chosenQuestions[currentQuestion]
                .answers"
              :key="index"
            >
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  :type="answerType"
                  :id="'answer_' + currentQuestion + '_' + alphabet[index]"
                  :value="alphabet[index]"
                  :name="'answers_' + currentQuestion"
                  v-model="chosenQuestions[currentQuestion].userAnswer"
                />
                <label
                  class="form-check-label"
                  :for="'answer_' + currentQuestion + '_' + alphabet[index]"
                >
                  {{ answer.replaceAll("\\", "") }}
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <section
      id="user_info"
      v-if="finishedQuiz == true && userInfo.submitted == false"
      class="container d-flex flex-column justify-content-center p-5"
    >
      <div class="row">
        <div class="col-xl-8 col-lg-9 mx-auto text-center">
          <h2 class="fw-bold">Thank you for taking the quiz</h2>
          <p>
            To complete the quiz and view your results, please fill in the
            following fields:
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-6 col-lg-7 mx-auto">
          <form
            id="user_info_form"
            name="user_info_form"
            action=""
            @submit.prevent="sendUserInfo()"
          >
            <div class="row">
              <div class="col-lg-6">
                <label class="form-label" for="first_name">First Name</label>
                <input
                  id="first_name"
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  name="user_info_form"
                  v-model="userInfo.first_name"
                />
              </div>
              <div class="col-lg-6">
                <label class="form-label" for="last_name">Last Name</label>
                <input
                  id="last_name"
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  name="user_info_form"
                  v-model="userInfo.last_name"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-6">
                <label class="form-label" for="email">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  name="user_info_form"
                  v-model="userInfo.email"
                />
              </div>
              <div class="col-lg-6">
                <label class="form-label" for="phone">Phone</label>
                <input
                  id="phone"
                  type="text"
                  class="form-control"
                  placeholder="Phone"
                  name="user_info_form"
                  v-model="userInfo.phone"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-lg-6 mx-auto text-center">
                <button class="btn btn-success btn-lg btn-block">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- SP: QUIZ RESULTS -->
    <section
      class="overflow-auto container-fluid py-5"
      v-if="finishedQuiz == true && userInfo.submitted == true"
      id="resultsContainer"
    >
      <div class="row mt-5">
        <div class="col-xl-6 col-lg-9 mx-auto h-100 mt-5">
          <h3 class="w-100 text-center fw-bold">Your results:</h3>
          <br />

          <div class="mb-5 text-center">
            <span class="h1">{{ score + "/" + chosenQuestions.length }}</span>
            <div class="bg-light p-5 mt-5" v-if="score.length > 0">
              The Project Management Essentials course would be a great
              opportunity to level up your skills. To learn more,
            </div>
            <a
              role="button"
              href="https://eco.ca/blog/eco-canada-launches-a-new-project-management-training-program-with-meridus-management-inc/"
              class="btn btn-success"
              >click here to leanr more</a
            >
          </div>
        </div>
      </div>
      <!-- SP: REVIEW -->
      <div class="row">
        <div class="col-xl-6 col-lg-9 mx-auto p-5 bg-white">
          <div
            class="mt-5"
            v-for="(question, index) in chosenQuestions"
            :key="index"
          >
            <h4 class="w-100 fw-bold">
              {{ index + 1 }} )
              {{ question["question-text"].replaceAll("\\", "") }}
            </h4>
            <h5 class="mt-4 ms-2">Correct answer:</h5>

            <div
              class="text-success ms-5"
              v-for="(ans, ansID) in question['correct-answer'].split(',')"
              :key="ansID"
            >
              {{
                ans.toUpperCase() + ") " + chosenAnswer(question, ans, ansID)
              }}
            </div>

            <h5 class="mt-4 ms-2">You chose:</h5>
            <div
              :class="'w-100 ms-5' + isCorrect(question)"
              v-for="(ans, ansID) in question.userAnswer"
              :key="ans[ansID]"
            >
              {{
                ans.toUpperCase() +
                ") " +
                question["answers"][alphabet.indexOf(ans)]
              }}
              <!-- {{ question.answers[question.userAnswer].replaceAll("\\", "") }} -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <pre class="debug" v-if="debug">
      answer:{{ this.chosenQuestions[currentQuestion] }}
    </pre>

    <!-- SP: STAT BAR / FOOTER -->
    <footer id="statbar" class="container-fluid" v-if="beginQuiz">
      <div class="progress row mb-auto">
        <div
          class="progress-bar"
          role="progressbar"
          :style="'width:' + (currentQuestion + 1) * 20 + '%'"
          :aria-valuenow="(currentQuestion + 1) * 20 + '%'"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ (currentQuestion + 1) * 20 + "%" }}
        </div>
      </div>
      <div class="row">
        <div class="col d-flex align-items-center justify-content-start">
          <button
            class="btn btn-success btn-lg d-inline-flex align-items-center"
            @click="previousQuestion"
            v-if="currentQuestion > 0"
          >
            <i
              class="fa fa-angle-double-left fa-2x me-3"
              aria-hidden="true"
            ></i>
            Previous Question
          </button>
        </div>
        <div class="col p-0 text-center">
          <div
            class="
              text-white
              h5
              rounded-circle
              mx-auto
              d-flex
              align-items-center
              justify-content-center
              p-2
            "
            id="progressCircle"
          >
            {{ currentQuestion + 1 }} /
            {{ chosenQuestions.length }}
          </div>
        </div>
        <div class="col d-flex align-items-center justify-content-end">
          <button
            class="
              btn btn-success btn-lg
              my-auto
              d-inline-flex
              align-items-center
            "
            tabindex="1"
            :disabled="isDisabled"
            @click="nextQuestion"
            v-if="currentQuestion < chosenQuestions.length - 1"
          >
            Next Question
            <i
              class="fa fa-angle-double-right fa-2x ms-3"
              aria-hidden="true"
            ></i>
          </button>
          <button
            class="
              btn btn-success btn-lg
              ms-auto
              d-inline-flex
              align-items-center
            "
            :disabled="isDisabled"
            @click="gradeQuiz"
            v-if="currentQuestion == chosenQuestions.length - 1"
          >
            Get My Results
            <i class="fa fa-check-circle fa-2x ms-3" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
  <!-- <Tutorial /> -->
</template>

<script>
var url =
  "https://eco.ca/wp-content/themes/hello-theme-child-master/quiz_api.php";

export default {
  name: "IndexPage",
  data() {
    return {
      questions: null,
      fullQuestionList: [],
      chosenQuestions: [],
      currentQuestion: 0,
      beginQuiz: false,
      finishedQuiz: false,
      score: [],
      debug: false,
      userInfo: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        submitted: false,
      },
      alphabet: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    };
  },

  methods: {
    nextQuestion() {
      if (this.currentQuestion < this.chosenQuestions.length - 1) {
        this.currentQuestion++;
        var clist = document.getElementsByClassName("form-check-input");
        for (var i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
      }
    },
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        var clist = document.getElementsByClassName("form-check-input");
        for (var i = 0; i < clist.length; ++i) {
          clist[i].checked = false;
        }
      }
    },
    gradeQuiz() {
      this.beginQuiz = false;
      this.finishedQuiz = true;
      var score = 0;
      for (var i = 0; i < this.chosenQuestions.length; ++i) {
        if (
          this.chosenQuestions[i]["correct-answer"]
            .split(",")
            .includes(this.chosenQuestions[i].userAnswer)
        ) {
          score++;
        }
      }
      this.score.push(score);
      console.log(
        "FINAL:",
        this.chosenQuestions,
        this.score + "/" + this.chosenQuestions.length
      );
    },
    isCorrect: function (question) {
      for (var a in question.answers) {
        if (question["correct-answer"].includes(question.userAnswer)) {
          return " fw-bold text-success";
        } else {
          return " fst-italic text-danger";
        }
      }
    },
    chosenAnswer: function (question, answer, ansID) {
      var correctAnswer = question["correct-answer"].split(",");
      var alphIndex = this.alphabet.indexOf(answer);
      var chosenAns = question["answers"][ansID];
      console.log(
        "correct:",
        correctAnswer,
        "alphindex:",
        alphIndex,
        "answers:",
        question["answers"],
        "chosen:",
        chosenAns
      );
      return chosenAns;
    },
    sendUserInfo() {
      var aoProtocol = location.protocol;
      if (aoProtocol.indexOf("http") < 0) aoProtocol = "http:";
      var aoCAP = {
        aid: "42902",
        fid: "6594f4ab-9a87-4a75-a869-3a2a324662e0",
        did: "d-0001",
        server: "info.eco.ca",
        formName: "user_info_form",
        protocol: aoProtocol,
      };
      var aoArr = aoArr || [];
      aoArr.push(aoCAP);
      function AoProcessForm(formelement) {
        for (let AoI = 0; AoI < aoArr.length; AoI++) {
          if (
            aoArr[AoI].aid &&
            aoArr[AoI].fid &&
            aoArr[AoI].did &&
            aoArr[AoI].server &&
            (aoArr[AoI].formId || aoArr[AoI].formName)
          ) {
            var d = document,
              thisFormId = formelement.id || "",
              thisFormName = formelement.name || "",
              bi = function (i) {
                return d.getElementById(i);
              },
              bn = function (i) {
                return d.getElementsByName(i)[0];
              },
              names = [],
              values = [],
              params = {},
              w = window,
              targetIdOrName = aoArr[AoI].formName
                ? bn(aoArr[AoI].formName)
                : bi(aoArr[AoI].formId),
              len = targetIdOrName.elements.length,
              isLoaded = false,
              ud = "undefined",
              st = function (f, i) {
                w.setTimeout(f, i);
              },
              ce = function (t) {
                return d.createElement(t);
              },
              gid = function (p) {
                var j,
                  i = 0,
                  n = Math.random,
                  r = [],
                  c = "0123456789abcdef".split("");
                for (; i < 16; i++) r[i] = c[(0 | (n() * 16)) & 0xf];
                j = p + r.join("");
                return bi(j) == null ? j : gid(p);
              },
              addInput = function (form, name, value) {
                var el = ce("input");
                el.name = name;
                el.value = value;
                form.appendChild(el);
              },
              idifr = gid("aoCapT");

            if (
              aoArr[AoI].formName == thisFormName ||
              aoArr[AoI].formId == thisFormId
            ) {
              var dTarget = ce("div");
              dTarget.style.display = "none";
              d.body.appendChild(dTarget);
              dTarget.innerHTML =
                '<iframe name="' + idifr + '" id="' + idifr + '"></iframe>'; // generate iframe

              var dForm = ce("form"),
                idform = gid("aoCapD");
              dForm.id = idform;
              dForm.style.display = "none";
              dForm.method = "POST";
              dForm.enctype = "multipart/form-data";
              dForm.acceptCharset = "UTF-8";
              dForm.target = idifr; // form targets iframe
              dForm.action =
                (aoCAP.protocol || w.location.protocol) +
                "//" +
                aoCAP.server +
                "/acton/forms/userSubmit.jsp";
              d.body.appendChild(dForm); // generate form

              for (i = 0; i < len; i++) {
                var el = targetIdOrName.elements[i];
                var name = typeof el.name != ud ? el.name : null;
                var value = typeof el.value != ud ? el.value : null;
                tagName = el.nodeName.toLowerCase();
                if (
                  tagName == "input" &&
                  (el.type == "radio" || el.type == "checkbox") &&
                  !el.checked
                ) {
                  name = null;
                } else if (
                  tagName == "select" &&
                  el.selectedIndex &&
                  el.selectedIndex != -1 &&
                  el.options[el.selectedIndex] &&
                  el.options[el.selectedIndex].value
                ) {
                  value = el.options[el.selectedIndex].value;
                }
                if (name != null && name != "") {
                  names.push(name);
                  values.push(el.value);
                  console.log(
                    "Element name: " + el.name + " / Element value: " + el.value
                  );
                  params[name] = el.value;
                }
                addInput(dForm, el.name, el.value);
              }

              aoCAP.pid = 0;
              aoCAP.cuid = aoCAP.cuid || "";
              aoCAP.srcid = aoCAP.srcid || "";
              aoCAP.camp = aoCAP.camp || "";
              addInput(dForm, "ao_a", aoArr[AoI].aid);
              addInput(dForm, "ao_f", aoArr[AoI].fid);
              addInput(dForm, "ao_d", aoArr[AoI].fid + ":" + aoArr[AoI].did);
              addInput(dForm, "ao_p", 0);
              addInput(dForm, "ao_jstzo", new Date().getTimezoneOffset());
              addInput(dForm, "ao_form_neg_cap", "");
              addInput(dForm, "ao_refurl", d.referrer);
              addInput(dForm, "ao_cuid", aoCAP.cuid);
              addInput(dForm, "ao_srcid", aoCAP.srcid);
              addInput(dForm, "ao_camp", aoCAP.camp);
              bi(idform).submit();

              var dTargetFrame = bi(idifr);
              dTargetFrame.onload = function () {
                isLoaded = true;
              };
              var waitForSubmit = function () {
                this.count = "";
                if (!(isLoaded || dTargetFrame.readyState == "complete")) {
                  st(waitForSubmit, 200);
                  this.count++;
                } else if (this.count > 7) {
                  return true;
                  console.log("skipping dForm");
                } else {
                  d.body.removeChild(dForm);
                  d.body.removeChild(dTarget);
                }
              };
              st(waitForSubmit, 100);
            }
          } else {
            console.log("aoCAP property missing");
          }
        }
      }

      var url =
        "https://info.eco.ca/acton/eform/42902/6594f4ab-9a87-4a75-a869-3a2a324662e0/d-ext-0001";
      // this.$axios.post(url, this.userInfo).then(function (response) {
      //   console.log(response);
      // });
      setTimeout(AoProcessForm(this.userInfo), 0);
      this.userInfo.submitted = true;
    },

    toggleDebug() {
      this.debug = !this.debug;
      console.log(this.debug);
    },
  },
  computed: {
    answerType: function () {
      if (this.chosenQuestions[this.currentQuestion].answers.length <= 4) {
        return "radio";
      } else {
        return "checkbox";
      }
    },
    isDisabled: function () {
      if (
        this.chosenQuestions.length > 0 &&
        this.chosenQuestions[this.currentQuestion].userAnswer.length == 0
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.$axios.get(url).then((response) => {
      this.questions = Object.values(response.data);

      for (var t in this.questions) {
        if (this.questions[t] != null) {
          for (var q in this.questions[t]) {
            var question = {};
            question["question-text"] = this.questions[t][q]["question-text"];
            question["correct-answer"] = this.questions[t][q]["correct-answer"];
            question.userAnswer = [];
            question.answers = [];

            for (var a in Object.keys(this.questions[t][q])) {
              // console.log(Object.keys(this.questions[t][q])[a]);
              if (Object.keys(this.questions[t][q])[a].includes("answer-")) {
                var answer_name = Object.keys(this.questions[t][q])[a];
                var answer = this.questions[t][q][answer_name];
                // console.log("answer: " + answer);
                if (answer !== "") {
                  question.answers.push(answer);
                }
              }
            }
            // console.log(question);
            this.fullQuestionList.push(question);
          }
        }
      }

      // SP: fill fullQuestionList with questions unless duplicate
      while (this.chosenQuestions.length < 5) {
        var randomNumber = Math.random();
        var randomKey = Math.floor(randomNumber * this.fullQuestionList.length);
        var randomQuestion = this.fullQuestionList[randomKey];
        if (this.chosenQuestions.indexOf(randomQuestion) == -1) {
          this.chosenQuestions.push(randomQuestion);
        }
      }
      console.log(this.chosenQuestions);
    });
  },
};
</script>

