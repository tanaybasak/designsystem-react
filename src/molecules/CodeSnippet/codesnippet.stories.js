import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text, boolean, select } from '@storybook/addon-knobs';
import 'prismjs/components/prism-java';

//@update-path-build-start
import CodeSnippet from './CodeSnippet';
//@update-path-build-end

const code = `import java.util.Scanner;
public class Life {

    @Override @Bind("One")
    public void show(boolean[][] grid){
        String s = "";
        for(boolean[] row : grid){
            for(boolean val : row)
                if(val)
                    s += "*";
                else
                    s += ".";
            s += "
";
        }
        System.out.println(s);
    }

    public static boolean[][] gen(){
        boolean[][] grid = new boolean[10][10];
        for(int r = 0; r < 10; r++)
            for(int c = 0; c < 10; c++)
                if( Math.random() > 0.7 )
                    grid[r][c] = true;
        return grid;
    }

    public static void main(String[] args){
        boolean[][] world = gen();
        show(world);
        System.out.println();
        world = nextGen(world);
        show(world);
        Scanner s = new Scanner(System.in);
        while(s.nextLine().length() == 0){
            System.out.println();
            world = nextGen(world);
            show(world);

        }
    }
}
`;
storiesOf('CodeSnippet', module).add(
  'default',
  () => (
    <CodeSnippet
      type="edit"
      type={select('Type', ['read', 'edit'], 'read')}
      value={text('Code', `${code}`)}
      lanaguage="java"
      width="40rem"
      onCopy={action('onCopy triggered')}
      onEdit={action('onEdit triggered')}
    />
  ),
  {
    info: {
      text: `Description About CodeSnippet Component \n

      import { CodeSnippet} from '@patron/patron-react/codesnippet';
    import 'prismjs/components/prism-java';`
    }
  }
);
