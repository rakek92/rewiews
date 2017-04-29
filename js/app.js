window.ee = new EventEmitter();

var my_news = [
    {
        author: 'Самуил',
        date:'  13 октября 2011',
        text: 'Привет, Верунь! ниче себе ты крутая. фотка класс!!!!'
    },
    {
        author: 'Лилия Семёновна',
        date:'  14 октября 2011',
        text: 'Вероника, здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент, это и есть всемирно известный центр огранки алмазов и торговли бриллиантами'
    },
    {
        author: 'Лилия Семёновна',
        date:'  14 октября 2011',
        text: 'Вероника здравствуйте! Есть такой вопрос: Особый вид куниц жизненно стабилизирует кинетический момент?'
    }
];
var Article = React.createClass({
    propTypes:{
        data:React.PropTypes.shape({
            author:React.PropTypes.string.isRequired,
            text:React.PropTypes.string.isRequired
        })
    },
    getInitialState:function(){
        return {
            visible: false
        }
    },
    readmoreClick: function(e){
        e.preventDefault();
        this.setState({visible:true});
    },
    render: function() {
        var author = this.props.data.author,
            date=this.props.data.date,
            text = this.props.data.text;
            
        return (
            <div className="reviews_item">
                <p className="reviews_item_author">{author} <span className="reviews_item_date"> {date}</span></p>
                <p className="reviews_item_text">{text}</p>
            </div>
        )
    }
});
var Add=React.createClass({
    onButtonClick:function(e){
        e.preventDefault();
        var textEl=ReactDOM.findDOMNode(this.refs.text);
         console.log(textEl)
        var author = "Гость"
        var text = textEl.value;
        var date= '29 апреля 2017'

        var item=[{
            author:author,
            text:text,
            date:date
        }];
        window.ee.emit('News.add', item);
        textEl.value='';
        this.setState({textIsEmpty:true});
    },
    getInitialState: function () {
      return{
          
          textIsEmpty:true
      }
    },
    
    onTextChange:function(e){
        if(e.target.value.trim().length>0){
            this.setState({textIsEmpty:false})
        }else{ this.setState({textIsEmpty:true})}
        },    
   
    

    render:function(){
        return(
            <div className='input_container'>
                <form className="add cf">
                    <input onChange={this.onTextChange} className="reviews_add_text" defaultValue='' ref='text'/>
                    <button disabled={this.state.textIsEmpty} className="reviews_add_btn" onClick={this.onButtonClick} ref="alert_button">Написать консультанту</button>
                </form>
            </div>
        )
    },
});


var News=React.createClass({
    getInitialState:function () {
        return{
            counter:0
        }
    },

    propTypes:{
        data: React.PropTypes.array.isRequired
    },
    render:function(){
        var data=this.props.data;
        if(data.length){
            var newsTemplate=data.map(function(item, index){
                return (
                            <div key={index}>
                                <Article data={item}/>
                            </div>
                            )
            })
        }
        return(
            <div className="reviews_add">
                {newsTemplate}
               
            </div>
        )
    }
});

var App=React.createClass({
    getInitialState:function () {
        return{
            news:my_news
        }
    },
    componentDidMount:function(){
        var self=this;
        window.ee.addListener('News.add', function(item){
          var nextNews=self.state.news.concat(item);
          self.setState({news:nextNews})
        })
    },
    componentWillUnmount:function () {
        window.ee.removeListener('News.add');
    },
    render: function(){
        console.log('render');
        return(
            <div className="app">
                
                <News data={this.state.news} />
                <Add/>
            </div>
        )
    }
});
ReactDOM.render(
    <App />,

   document.getElementsByClassName('reviews')[0]
);